import { describe, expect, it } from "vitest";
import { planRequestSchema } from "./plan-request";

const valid = {
  groupName: "  Fictional Friday Friends  ",
  groupSize: "4",
  date: "2028-02-29",
  startTime: "18:00",
  endTime: "21:00",
  startingArea: "  Example Square  ",
  budgetPerPerson: "25.50",
  mood: "social",
  hardNo: "  No loud music  ",
};

describe("planning domain plan request", () => {
  it("accepts a fully valid request with numeric domain values", () => {
    const input = { ...valid, groupSize: 4, budgetPerPerson: 25.5 };
    const request = planRequestSchema.parse(input);
    expect(request.groupSize).toBe(4);
    expect(request.budgetPerPerson).toBe(25.5);
  });

  it("accepts hardNo omitted entirely", () => {
    const { hardNo, ...input } = valid;
    expect(hardNo).toBeDefined();
    expect(planRequestSchema.parse(input).hardNo).toBeUndefined();
  });
  it("normalizes a valid form request into domain values", () => {
    expect(planRequestSchema.parse(valid)).toEqual({
      ...valid,
      groupName: "Fictional Friday Friends",
      groupSize: 4,
      startingArea: "Example Square",
      budgetPerPerson: 25.5,
      hardNo: "No loud music",
    });
  });

  it.each(["relaxed", "social", "adventurous", "surprise-me"])("accepts mood %s", (mood) => {
    expect(planRequestSchema.safeParse({ ...valid, mood }).success).toBe(true);
  });

  it.each(["", "Social", "unknown", null, undefined])("rejects invalid mood %s", (mood) => {
    expect(planRequestSchema.safeParse({ ...valid, mood }).success).toBe(false);
  });

  for (const [field, min, max] of [["groupName", 2, 60], ["startingArea", 2, 80]] as const) {
    it.each([min, max])(`accepts ${field} length %i after trimming`, (length) => {
      expect(planRequestSchema.safeParse({ ...valid, [field]: ` ${"x".repeat(length)} ` }).success).toBe(true);
    });
    it.each(["", "   ", "x".repeat(min - 1), "x".repeat(max + 1)])(`rejects invalid ${field} length`, (value) => {
      expect(planRequestSchema.safeParse({ ...valid, [field]: value }).success).toBe(false);
    });
  }

  it.each([2, 6, "2", "6", " 4 ", "4.0"])("accepts integer group size %s", (groupSize) => {
    expect(planRequestSchema.safeParse({ ...valid, groupSize }).success).toBe(true);
  });
  it.each([1, 7, 2.5, "2.5", "", " ", "four", NaN, Infinity, -Infinity])("rejects group size %s", (groupSize) => {
    expect(planRequestSchema.safeParse({ ...valid, groupSize }).success).toBe(false);
  });

  it.each(["2028-02-29", "2000-02-29", "2026-04-30", "2020-01-01"])("accepts real calendar date %s, including past dates", (date) => {
    expect(planRequestSchema.safeParse({ ...valid, date }).success).toBe(true);
  });
  it.each(["2026-02-30", "2027-02-29", "1900-02-29", "2026-04-31", "2026-00-01", "2026-13-01", "2026-01-00", "2026-01-32", "26-01-01", "2026-1-01", "2026-01-01T00:00:00Z", ""])("rejects invalid date %s", (date) => {
    expect(planRequestSchema.safeParse({ ...valid, date }).success).toBe(false);
  });

  it.each([["00:00", "23:59"], ["18:00", "18:01"]])("accepts same-day time range %s–%s", (startTime, endTime) => {
    expect(planRequestSchema.safeParse({ ...valid, startTime, endTime }).success).toBe(true);
  });
  for (const field of ["startTime", "endTime"] as const) {
    it.each(["", "9:00", "09:0", "24:00", "25:00", "12:60", "-1:00", "18:00:00", " 18:00 "])(`rejects malformed ${field} %s without an ordering error`, (time) => {
      const result = planRequestSchema.safeParse({ ...valid, [field]: time });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((issue) => issue.path[0] === field)).toBe(true);
        expect(result.error.issues.some((issue) => issue.message === "End time must be later than start time.")).toBe(false);
      }
    });
  }
  it.each([["18:00", "18:00"], ["18:00", "17:59"], ["23:00", "01:00"]])("rejects unordered range %s–%s on endTime", (startTime, endTime) => {
    const result = planRequestSchema.safeParse({ ...valid, startTime, endTime });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues).toContainEqual(expect.objectContaining({ path: ["endTime"], message: "End time must be later than start time." }));
  });

  it.each([1, 1000, "1", "1000", " 25.50 ", "001.50", "1.234"])("accepts budget %s", (budgetPerPerson) => {
    expect(planRequestSchema.safeParse({ ...valid, budgetPerPerson }).success).toBe(true);
  });
  it.each([0.99, 1000.01, NaN, Infinity, -Infinity, "", " ", "NaN", "Infinity", "25pounds"])("rejects budget %s", (budgetPerPerson) => {
    expect(planRequestSchema.safeParse({ ...valid, budgetPerPerson }).success).toBe(false);
  });

  for (const field of ["groupSize", "budgetPerPerson"] as const) {
    it.each(["+2", "-2", "2,000", "£2", "0x2", "2e0", ".2", "2.", "2.0.0", "2 0"])(`rejects non-decimal grammar for ${field}: %s`, (value) => {
      expect(planRequestSchema.safeParse({ ...valid, [field]: value }).success).toBe(false);
    });
  }

  it.each([undefined, "", "   "])("omits an empty hard no %s", (hardNo) => {
    expect(planRequestSchema.parse({ ...valid, hardNo }).hardNo).toBeUndefined();
  });
  it("accepts 200 trimmed hard-no characters and rejects 201", () => {
    expect(planRequestSchema.parse({ ...valid, hardNo: ` ${"x".repeat(200)} ` }).hardNo).toHaveLength(200);
    expect(planRequestSchema.safeParse({ ...valid, hardNo: "x".repeat(201) }).success).toBe(false);
  });

  for (const field of Object.keys(valid)) {
    if (field !== "hardNo") {
      it(`rejects missing ${field}`, () => {
        expect(planRequestSchema.safeParse({ ...valid, [field]: undefined }).success).toBe(false);
      });
    }
    it.each([null, {}, [], true, new Blob(["fictional"])])(`rejects unexpected value types for ${field}`, (value) => {
      expect(planRequestSchema.safeParse({ ...valid, [field]: value }).success).toBe(false);
    });
  }
});
