import { z } from "zod";

const MAX_RESUME_SIZE = 1 * 1024 * 1024;
const ACCEPTED_RESUME_TYPES = ["application/pdf"];

export const formSchema = z.object({
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().min(1, { message: "Required" }),
  email: z.string().email({ message: "Required" }),
  phoneNumber: z.string().min(1, { message: "Required" }),
  school: z.string().min(1, { message: "Required" }),
  levelOfStudy: z.string().min(1, { message: "Required" }),
  countryOfResidence: z.string().min(1, { message: "Required" }),
  dietaryRestrictions: z.string().min(1, { message: "Required" }),
  age: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Required" })
  ),
  fieldOfStudy: z.string().min(1, { message: "Required" }),
  tShirtSize: z.string().min(1, { message: "Required" }),
  resume: z.any()
    .refine((files) => files?.length == 1, "Required")
    .refine(
      (files) => ACCEPTED_RESUME_TYPES.includes(files?.[0]?.type),
      "Only PDF files are accepted"
    )
    .refine((files) => files?.[0]?.size <= MAX_RESUME_SIZE, 'Max file size is 1MB'),
  githubProfile: z.string().optional(),
  linkedin: z.string().optional(),
  personalWebsite: z.string().optional(),
  additionalLinks: z.string().optional(),
  q1: z.string().min(1, { message: "Please input your answer to this question" }).max(1000, {
    message: "Your answer should not be longer than 1000 characters",
  }),
  q2: z.string().min(1, { message: "Please input your answer to this question" }).max(1000, {
    message: "Your answer should not be longer than 1000 characters",
  }),
  other: z.string().optional(),
  underrepresented: z.string().optional(),
  gender: z.string().optional(),
  pronouns: z.string().optional(),
  ethnicity: z.string().optional(),
  sexuality: z.string().optional(),
  mlhCodeOfConduct: z.boolean().refine((val) => val === true, {
    message: "You must agree to the MLH Code of Conduct",
  }),
  mlhPrivacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the MLH Privacy Policy",
  }),
  mlhEmails: z.boolean().optional(),
});

export type formSchemaType = z.infer<typeof formSchema>;
