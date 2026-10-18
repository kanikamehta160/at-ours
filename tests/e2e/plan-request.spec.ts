import { expect, test, type Page } from "@playwright/test";

async function fillRequest(page: Page, hardNo = "") {
  await page.getByLabel("Group name", { exact: true }).fill("  Fictional Friday Friends  ");
  await page.getByLabel("Group size", { exact: true }).fill("4");
  await page.getByLabel("Date", { exact: true }).fill("2028-02-29");
  await page.getByLabel("Start time", { exact: true }).fill("18:00");
  await page.getByLabel("End time", { exact: true }).fill("21:00");
  await page.getByLabel("Starting area", { exact: true }).fill("  Example Square  ");
  await page.getByLabel("Budget per person in GBP", { exact: true }).fill("25.50");
  await page.getByLabel("Mood", { exact: true }).selectOption("social");
  await page.getByLabel("Hard no (optional)", { exact: true }).fill(hardNo);
}

async function submit(page: Page) {
  await page.getByRole("button", { name: "Create plan request" }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/plan/new");
  await expect(page.getByRole("button", { name: "Create plan request" })).toBeEnabled();
});

test.describe("mobile request journey", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("mobile successful request shows every value, GBP and a populated edit form", async ({ page }) => {
    await fillRequest(page, "  No loud music  ");
    await submit(page);
    const summary = page.getByRole("region", { name: "Plan request summary" });
    await expect(summary).toBeVisible();
    for (const [term, value] of [
      ["Group name", "Fictional Friday Friends"], ["Group size", "4"],
      ["Date", "2028-02-29"], ["Start time", "18:00"], ["End time", "21:00"],
      ["Starting area", "Example Square"], ["Budget per person", "£25.50"],
      ["Mood", "Social"], ["Hard no", "No loud music"],
    ]) {
      await expect(summary.getByRole("term").filter({ hasText: new RegExp(`^${term}$`) })).toBeVisible();
      const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      await expect(summary.getByRole("definition").filter({ hasText: new RegExp(`^${escaped}$`) })).toHaveText(value);
    }
    await expect(page.getByRole("heading", { name: "Plan request summary" })).toBeFocused();
    await expect(page.getByRole("form")).toHaveCount(0);
    await page.getByRole("button", { name: "Edit request" }).click();
    for (const [label, value] of [
      ["Group name", "  Fictional Friday Friends  "], ["Group size", "4"],
      ["Date", "2028-02-29"], ["Start time", "18:00"], ["End time", "21:00"],
      ["Starting area", "  Example Square  "], ["Budget per person in GBP", "25.50"],
      ["Mood", "social"], ["Hard no (optional)", "  No loud music  "],
    ]) {
      await expect(page.getByLabel(label, { exact: true })).toHaveValue(value);
    }
  });
});

for (const hardNo of ["", "   "]) {
  test(`omits Hard no row for ${hardNo ? "whitespace" : "missing input"}`, async ({ page }) => {
    await fillRequest(page, hardNo);
    await submit(page);
    const summary = page.getByRole("region", { name: "Plan request summary" });
    await expect(summary).toBeVisible();
    await expect(summary.getByRole("term").filter({ hasText: /^Hard no$/ })).toHaveCount(0);
  });
}

test("rejected request associates errors, stays on the route and preserves valid fields", async ({ page }) => {
  await page.getByLabel("Group name", { exact: true }).fill("Fictional Friday Friends");
  await page.getByLabel("Starting area", { exact: true }).fill("Example Square");
  await submit(page);
  const errors = page.getByRole("region", { name: "Please correct the following fields" });
  await expect(errors).toBeFocused();
  await expect(errors).toHaveAttribute("aria-live", "assertive");
  await expect(errors.getByRole("link")).toHaveCount(6);
  const groupSize = page.getByLabel("Group size", { exact: true });
  await expect(groupSize).toHaveAttribute("aria-invalid", "true");
  await expect(groupSize).toHaveAccessibleDescription("Enter a group size from 2 to 6.");
  await expect(page.getByText("Enter a group size from 2 to 6.", { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/plan\/new$/);
  await expect(page.getByLabel("Group name", { exact: true })).toHaveValue("Fictional Friday Friends");
  await expect(page.getByLabel("Starting area", { exact: true })).toHaveValue("Example Square");
  await page.keyboard.press("Tab");
  await expect(errors.getByRole("link").first()).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(groupSize).toBeFocused();
  await expect(page.getByRole("region", { name: "Plan request summary" })).toHaveCount(0);
});

test("rejects unordered times, retains input and accepts correction", async ({ page }) => {
  await fillRequest(page);
  await page.getByLabel("End time", { exact: true }).fill("18:00");
  await submit(page);
  await expect(page.getByLabel("End time", { exact: true })).toHaveAccessibleDescription("End time must be later than start time.");
  await expect(page.getByLabel("Group name", { exact: true })).toHaveValue("  Fictional Friday Friends  ");
  await page.getByLabel("End time", { exact: true }).fill("18:01");
  await submit(page);
  await expect(page.getByRole("region", { name: "Plan request summary" })).toBeVisible();
});

test("rejects exponent notation for a numeric form value", async ({ page }) => {
  await fillRequest(page);
  await page.getByLabel("Budget per person in GBP", { exact: true }).fill("2e1");
  await submit(page);
  await expect(page.getByLabel("Budget per person in GBP", { exact: true })).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByRole("region", { name: "Plan request summary" })).toHaveCount(0);
});

test("keyboard traversal reaches submission and focuses confirmation", async ({ page }) => {
  await fillRequest(page);
  // Exercise DOM tab order; native date/time controls have browser-specific segments.
  await page.getByLabel("Starting area", { exact: true }).focus();
  for (const label of ["Budget per person in GBP", "Mood", "Hard no (optional)"]) {
    await page.keyboard.press("Tab");
    await expect(page.getByLabel(label, { exact: true })).toBeFocused();
  }
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Create plan request" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Plan request summary" })).toBeFocused();
});

test("form, errors and summary remain usable at 375px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await submit(page);
  await expect(page.getByRole("region", { name: "Please correct the following fields" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  for (const label of ["Group name", "Group size", "Date", "Start time", "End time", "Starting area", "Budget per person in GBP", "Mood", "Hard no (optional)"]) {
    const box = await page.getByLabel(label, { exact: true }).boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(375);
    }
  }
  await fillRequest(page, "x".repeat(200));
  await submit(page);
  await expect(page.getByRole("region", { name: "Plan request summary" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("refresh clears the request and restores an empty form", async ({ page }) => {
  await fillRequest(page, "No loud music");
  await submit(page);
  await expect(page.getByRole("region", { name: "Plan request summary" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: "Create plan request" })).toBeEnabled();
  await expect(page.getByRole("region", { name: "Plan request summary" })).toHaveCount(0);
  for (const label of ["Group name", "Group size", "Date", "Start time", "End time", "Starting area", "Budget per person in GBP", "Mood", "Hard no (optional)"]) {
    await expect(page.getByLabel(label, { exact: true })).toHaveValue("");
  }
});

test("submission works offline without requests, URL values or browser storage", async ({ page, context }) => {
  await page.waitForLoadState("networkidle");
  await fillRequest(page, "No loud music");
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.method()));
  await context.setOffline(true);
  await submit(page);
  await expect(page.getByRole("region", { name: "Plan request summary" })).toBeVisible();
  expect(requests).toEqual([]);
  await expect(page).toHaveURL(/\/plan\/new$/);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length, cookies: document.cookie }))).toEqual({ local: 0, session: 0, cookies: "" });
});

test("root introduces At Ours and links to the plan form", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("At Ours", { exact: false }).first()).toBeVisible();
  await page.getByRole("link", { name: "Make us a plan" }).click();
  await expect(page).toHaveURL(/\/plan\/new$/);
  await expect(page.getByRole("heading", { name: "Make us a plan", level: 1 })).toBeVisible();
  await expect(page.getByText("Tell us the shape of it. We’ll work out the rest later.")).toBeVisible();
});

test("Edit request returns all entered values and supports keyboard resubmission", async ({ page }) => {
  await fillRequest(page, "  No loud music  ");
  await page.getByLabel("Mood", { exact: true }).selectOption("surprise-me");
  await submit(page);
  await expect(page.getByRole("definition").filter({ hasText: /^Surprise me$/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Plan request summary" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Edit request" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByLabel("Group name", { exact: true })).toBeFocused();
  for (const [label, value] of [
    ["Group name", "  Fictional Friday Friends  "], ["Group size", "4"],
    ["Date", "2028-02-29"], ["Start time", "18:00"], ["End time", "21:00"],
    ["Starting area", "  Example Square  "], ["Budget per person in GBP", "25.50"],
    ["Mood", "surprise-me"], ["Hard no (optional)", "  No loud music  "],
  ]) {
    await expect(page.getByLabel(label, { exact: true })).toHaveValue(value);
  }
  await page.getByLabel("Budget per person in GBP", { exact: true }).fill("40");
  await page.getByLabel("Mood", { exact: true }).selectOption("relaxed");
  await page.getByLabel("Hard no (optional)", { exact: true }).fill("");
  await page.getByRole("button", { name: "Create plan request" }).focus();
  await page.keyboard.press("Enter");
  const summary = page.getByRole("region", { name: "Plan request summary" });
  await expect(summary.getByRole("definition").filter({ hasText: /^£40.00$/ })).toBeVisible();
  await expect(summary.getByRole("definition").filter({ hasText: /^Relaxed$/ })).toBeVisible();
  await expect(summary.getByRole("term").filter({ hasText: /^Hard no$/ })).toHaveCount(0);
});

test("without JavaScript the form cannot submit private values natively", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    await page.goto("/plan/new");
    await expect(page.getByRole("button", { name: "Create plan request" })).toBeDisabled();
    await expect(page.getByLabel("Group name", { exact: true })).toBeDisabled();
    await expect(page.getByText("JavaScript is required to validate this request privately in your browser.")).toBeVisible();
  } finally {
    await context.close();
  }
});
