import { z } from "zod";

// Form numbers accept unsigned base-10 integers or complete decimals only.
const decimalPattern = /^\d+(?:\.\d+)?$/;
const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

function formNumber(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return decimalPattern.test(trimmed) ? Number(trimmed) : value;
}

function minutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

const timeSchema = z.string({ error: "Enter a time in HH:mm format." }).regex(
  timePattern,
  "Enter a valid time in HH:mm format.",
);

export const planRequestSchema = z.object({
  groupName: z.string({ error: "Enter a group name." }).trim()
    .min(2, "Group name must contain at least 2 characters.")
    .max(60, "Group name must contain no more than 60 characters."),
  groupSize: z.preprocess(formNumber, z.number({ error: "Enter a group size from 2 to 6." })
    .int("Group size must be a whole number.")
    .min(2, "Group size must be at least 2.")
    .max(6, "Group size must be no more than 6.")),
  date: z.iso.date({ error: "Enter a valid date in YYYY-MM-DD format." }),
  startTime: timeSchema,
  endTime: timeSchema,
  startingArea: z.string({ error: "Enter a starting area." }).trim()
    .min(2, "Starting area must contain at least 2 characters.")
    .max(80, "Starting area must contain no more than 80 characters."),
  budgetPerPerson: z.preprocess(formNumber, z.number({ error: "Enter a budget in pounds using digits and an optional decimal point." })
    .min(1, "Budget must be at least £1 per person.")
    .max(1000, "Budget must be no more than £1,000 per person.")),
  mood: z.enum(["relaxed", "social", "adventurous", "surprise-me"], {
    error: "Choose a mood.",
  }),
  hardNo: z.string({ error: "Enter text for hard no, or leave it blank." }).trim()
    .max(200, "Hard no must contain no more than 200 characters.")
    .optional()
    .transform((value) => value || undefined),
}).superRefine((request, context) => {
  // Do not report ordering errors for malformed times.
  if (timePattern.test(request.startTime) && timePattern.test(request.endTime)
    && minutes(request.endTime) <= minutes(request.startTime)) {
    context.addIssue({
      code: "custom",
      path: ["endTime"],
      message: "End time must be later than start time.",
    });
  }
});

export type PlanRequest = z.output<typeof planRequestSchema>;
export type Mood = PlanRequest["mood"];
