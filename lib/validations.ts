import { z } from "zod";

export const createWhatIfSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "What If cannot be empty")
    .max(500, "What If cannot be more than 500 characters"),
});

export const createReactionSchema = z.object({
  reactionType: z.enum([
    "funny",
    "interesting",
    "crazy",
    "build",
  ]),
  visitorId: z.string().min(1, "Session ID is required"),
});

export const createReplySchema = z.object({
  parentId: z.string().nullable().default(null),

  content: z
    .string()
    .trim()
    .min(1, "Reply cannot be empty")
    .max(280, "Reply cannot be more than 280 characters"),
});