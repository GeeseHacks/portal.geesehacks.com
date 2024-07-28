import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  school: z.string().min(1, { message: "School is required" }),
  levelOfStudy: z.string().min(1, { message: "Level of study is required" }),
  countryOfResidence: z.string().min(1, { message: "Country is required" }),
  dietaryRestrictions: z.string().min(1, { message: "Dietary restriction is required" }),
  age: z.number().min(1, { message: "Age is required" }),
  address: z.string().optional(),
  fieldOfStudy: z.string().min(1, { message: "Field of study is required" }),
  tShirtSize: z.string().min(1, { message: "T-shirt size is required" }),
  resume: z.any().optional(),
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
  q3: z.string().min(1, { message: "Please input your answer to this question" }).max(1000, {
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
