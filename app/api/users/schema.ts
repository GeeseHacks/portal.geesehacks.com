import { z } from 'zod';

// Define the UserStatus enum
export const UserStatus = z.enum(['ACCEPTED', 'REJECTED', 'WAITLIST', 'APPLIED', 'NOT_APPLIED']);

// Define a custom validation schema using Zod
export const userSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  school: z.string().min(1, { message: "School is required" }),
  level_of_study: z.string().min(1, { message: "Level of study is required" }),
  field_of_study: z.string().min(1, { message: "Field of study is required" }),
  country_of_residence: z.string().min(1, { message: "Country of residence is required" }),
  dietary_restrictions: z.string().optional(),
  age: z.number().min(1, { message: "Age is required" }),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  personal_website: z.string().optional(),
  resume: z.string().url({ message: "Resume URL is required and must be a valid URL" }),
  MLH_authorize: z.boolean().refine(val => val === true, { message: "You must agree to the MLH Code of Conduct" }),
  optional_consider: z.string().optional(),
  optional_gender: z.string().optional(),
  optional_pronouns: z.string().optional(),
  optional_race: z.string().optional(),
  optional_underrepresented: z.string().optional(),
  t_shirt_size: z.string().optional(),
  status: UserStatus.optional().default('APPLIED'),
});
