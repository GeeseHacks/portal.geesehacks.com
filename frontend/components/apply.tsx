"use client";

import React, { useEffect } from "react";
import { SubmitHandler, useForm, UseFormRegisterReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { options } from "./formAssets/formAssets";
import { getAgeOptions } from "./formAssets/formAssets";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { signOutAction } from './utils/signOutAction';
import { useSession } from 'next-auth/react'


interface InputFieldProps {
  id: string;
  label: string;
  registerOptions: UseFormRegisterReturn;
  placeholder?: string;
  type?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  registerOptions,
  placeholder,
  type = "text",
  error,
}) => (
  <div className="col-span-1">
    <label className="block mb-2 text-xl font-semibold" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      {...registerOptions}
      className={`w-full p-2 border ${
        error ? "border-red-500 border-2" : "border-gray-700"
      } rounded-lg text-black`}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-s italic">{error}</p>}
  </div>
);

interface SelectFieldProps {
  id: string;
  label: string;
  registerOptions: UseFormRegisterReturn;
  options: any[];
  className?: string;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  registerOptions,
  options,
  className,
  error,
}) => (
  <div className={className}>
    <label className="block mb-2 text-xl font-semibold" htmlFor={id}>
      {label}
    </label>
    <select
      id={id}
      {...registerOptions}
      className={`custom-select w-full p-2 border ${
        error ? "border-red-500 border-2" : "border-gray-700"
      } rounded-lg text-black`}
    >
      <option value=""></option>
      {options.map((option, index) => (
        <option
          key={index}
          value={typeof option === "string" ? option : option.value}
        >
          {typeof option === "string" ? option : option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-s italic">{error}</p>}
  </div>
);

interface TextAreaFieldProps {
  id: string;
  label: string;
  registerOptions: UseFormRegisterReturn;
  placeholder?: string;
  error?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  id,
  label,
  registerOptions,
  placeholder,
  error,
}) => (
  <div className="col-span-1">
    <label className="block mb-2 text-xl font-semibold" htmlFor={id}>
      {label}
    </label>
    <textarea
      id={id}
      {...registerOptions}
      className={`w-full p-2 border ${
        error ? "border-red-500 border-2" : "border-gray-700"
      } rounded-lg text-black h-48`}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-s italic">{error}</p>}
  </div>
);

interface ComplexInputFieldProps {
  id: string;
  label: string;
  registerOptions: any;
  placeholder: string;
  type?: string;
  error?: string;
}

const ComplexInputField: React.FC<ComplexInputFieldProps> = ({
  id,
  label,
  registerOptions,
  placeholder,
  type = "text",
  error,
}) => (
  <div className="col-span-1 md:col-span-2">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
      <div className="col-span-1">
        <label className="block mb-2 text-xl font-bold" htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          type={type}
          {...registerOptions}
          className="w-full p-2 border border-gray-700 rounded-lg text-black"
          placeholder={placeholder}
        />
        {error && <p className="text-red-500 text-s italic">{error}</p>}
      </div>
    </div>
  </div>
);

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, {
    message: "Phone number must be in the format xxx-xxx-xxxx",
  }),
  school: z.string().min(1, { message: "School is required" }),
  levelOfStudy: z.string().min(1, { message: "Level of study is required" }),
  countryOfResidence: z.string().min(1, { message: "Country is required" }),
  dietaryRestrictions: z
    .string()
    .min(1, { message: "Dietary restriction is required" }),
  age: z.preprocess(
    (val) => parseInt(z.string().parse(val), 10),
    z.number({ required_error: "Age is required" })
  ),
  address: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  tShirtSize: z.string().min(1, { message: "T-shirt size is required" }),
  resume: z.any().optional(),
  githubProfile: z.string().optional(),
  linkedin: z.string().optional(),
  personalWebsite: z.string().optional(),
  additionalLinks: z.string().optional(),
  q1: z
    .string()
    .min(1, { message: "Please input your answer to this question" })
    .max(600, {
      message: "Your answer should not be longer than 250 characters",
    }),
  q2: z
    .string()
    .min(1, { message: "Please input your answer to this question" })
    .max(600, {
      message: "Your answer should not be longer than 250 characters",
    }),
  q3: z
    .string()
    .min(1, { message: "Please input your answer to this question" })
    .max(600, {
      message: "Your answer should not be longer than 250 characters",
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

type formSchemaType = z.infer<typeof formSchema>;

const RegistrationForm: React.FC = () => {
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<formSchemaType> = async (data) => {
    console.log("form submitted!");
    console.log(data);
    const tempId = Date.now() % 1000;
    console.log(tempId);
    try {
      const userData = await axios.post("/api/users", {
        id: tempId,
        firstname: data.firstName,
        lastname: data.lastName,
        age: data.age,
        email: data.email,
        phone_number: data.phoneNumber,
        school: data.school,
        level_of_study: data.levelOfStudy,
        field_of_study: data.fieldOfStudy,
        country_of_residence: data.countryOfResidence,
        address: data.address,
        dietary_restrictions: data.dietaryRestrictions,
        github: data.githubProfile,
        linkedin: data.linkedin,
        personal_website: data.personalWebsite,
      });
      const userId = userData.data.id;

      await axios.post("/api/application-responses", {
        userid: userId,
        q1: data.q1,
        q2: data.q2,
        q3: data.q3,
      });

      reset(); //scuffed
    } catch (err) {
      console.error("Submission Error: ", err);
    }
  };

  
  return (
    <div className="max-w-5xl mx-auto p-8 text-white">
      
      {/* Signout button */}
      <form action={signOutAction}>
        <button className="flex h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-3 text-sm font-medium text-white shadow-lg transition duration-200 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-600 hover:to-red-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          Sign Out
        </button>
      </form>
      <button onClick={() => {console.log(session)}}>Get Usser</button>
      <div>
        {session && <h1>{JSON.stringify(session.user)}</h1>}
      </div>
      <h1 className="text-white text-4xl font-bold mb-6">Hacker Information</h1>
      <hr className="border-white pb-6" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-14">
          <InputField
            id="firstName"
            label="First Name *"
            registerOptions={register("firstName")}
            placeholder="John"
            error={errors.firstName?.message}
          />
          <InputField
            id="lastName"
            label="Last Name *"
            registerOptions={register("lastName")}
            placeholder="Doe"
            error={errors.lastName?.message}
          />
          <SelectField
            id="age"
            label="Age *"
            registerOptions={register("age")}
            options={getAgeOptions().map((age) => ({ label: age, value: age }))}
            className="col-span-1"
            error={errors.age?.message}
          />
          <InputField
            id="email"
            label="Email *"
            registerOptions={register("email")}
            placeholder="Enter email"
            type="email"
            error={errors.email?.message}
          />
          <ComplexInputField
            id="phoneNumber"
            label="Phone Number *"
            registerOptions={register("phoneNumber")}
            placeholder="123-456-7890"
            error={errors.phoneNumber?.message}
          />
          <SelectField
            id="school"
            label="School *"
            registerOptions={register("school")}
            options={options.schools}
            className="col-span-1"
            error={errors.school?.message}
          />
          <SelectField
            id="levelOfStudy"
            label="Level of Study *"
            registerOptions={register("levelOfStudy")}
            options={options.levelsOfStudy}
            className="col-span-1"
            error={errors.levelOfStudy?.message}
          />
          <SelectField
            id="fieldOfStudy"
            label="Field of Study"
            registerOptions={register("fieldOfStudy")}
            options={options.fieldsOfStudy}
            className="col-span-1"
            error={errors.fieldOfStudy?.message}
          />
          <SelectField
            id="countryOfResidence"
            label="Country of Residence *"
            registerOptions={register("countryOfResidence")}
            options={options.countries}
            className="col-span-1"
            error={errors.countryOfResidence?.message}
          />
          <ComplexInputField
            id="address"
            label="Address"
            registerOptions={register("address")}
            placeholder="Enter address"
            error={errors.address?.message}
          />
          <SelectField
            id="dietaryRestrictions"
            label="Dietary Restrictions *"
            registerOptions={register("dietaryRestrictions")}
            options={options.dietaryRestrictions}
            className="col-span-1"
            error={errors.dietaryRestrictions?.message}
          />
          <InputField
            id="other"
            label="Other"
            registerOptions={register("other")}
            placeholder="Other..."
            error={errors.other?.message}
          />
          <SelectField
            id="tShirtSize"
            label="T-shirt Size *"
            registerOptions={register("tShirtSize")}
            options={options.tShirtSizes}
            className="col-span-1"
            error={errors.tShirtSize?.message}
          />
          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="resume"
            >
              Resume
            </label>
            <input
              id="resume"
              type="file"
              {...register("resume")}
              className="custom-upload w-full p-2 border border-gray-700 rounded-lg text-black"
            />
          </div>
          <InputField
            id="githubProfile"
            label="GitHub Profile"
            registerOptions={register("githubProfile")}
            placeholder=""
            error={errors.githubProfile?.message}
          />
          <InputField
            id="linkedin"
            label="LinkedIn"
            registerOptions={register("linkedin")}
            placeholder=""
            error={errors.linkedin?.message}
          />
          <InputField
            id="personalWebsite"
            label="Personal Website"
            registerOptions={register("personalWebsite")}
            placeholder=""
            error={errors.personalWebsite?.message}
          />
          <InputField
            id="additionalLinks"
            label="Additional Links"
            registerOptions={register("additionalLinks")}
            placeholder=""
            error={errors.additionalLinks?.message}
          />
        </div>
        <h1 className="text-white text-4xl font-bold mb-6 mt-24">
          Long Answer Questions
        </h1>
        <hr className="border-white pb-6" />
        <div className="grid grid-cols-1 gap-x-12 gap-y-10">
          <TextAreaField
            id="q1"
            label="Why are you running *"
            registerOptions={register("q1")}
            placeholder="Type your answer"
            error={errors.q1?.message}
          />
          <TextAreaField
            id="q2"
            label="How are you running *"
            registerOptions={register("q2")}
            placeholder="Type your answer"
            error={errors.q2?.message}
          />
          <TextAreaField
            id="q3"
            label="Where are you running *"
            registerOptions={register("q3")}
            placeholder="Type your answer"
            error={errors.q3?.message}
          />
        </div>

        <h1 className="text-white text-4xl font-bold mb-6 mt-10">
          Optional Demographic Questions
        </h1>
        <hr className="border-white pb-6" />
        <h1 className="text-white text-xl font-bold mb-6">
          The answers to these questions will not affect your application in any
          way
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">
          <SelectField
            id="underrepresented"
            label="Do you identify as part of an underrepresented group in the technology industry?"
            registerOptions={register("underrepresented")}
            options={["Yes", "No", "Unsure"]}
            className="col-span-2"
            error={errors.underrepresented?.message}
          />
          <SelectField
            id="gender"
            label="Gender"
            registerOptions={register("gender")}
            options={options.genders}
            className="col-span-2"
            error={errors.gender?.message}
          />
          <SelectField
            id="pronouns"
            label="Pronouns"
            registerOptions={register("pronouns")}
            options={options.pronouns}
            className="col-span-2"
            error={errors.pronouns?.message}
          />
          <SelectField
            id="ethnicity"
            label="Race/Ethnicity"
            registerOptions={register("ethnicity")}
            options={options.ethnicities}
            className="col-span-2"
            error={errors.ethnicity?.message}
          />
          <SelectField
            id="sexuality"
            label="Do you consider yourself to be any of the following?"
            registerOptions={register("sexuality")}
            options={options.sexualities}
            className="col-span-2"
            error={errors.sexuality?.message}
          />
        </div>
        <hr className="border-white pb-6 mt-10" />
        <h1 className="text-white text-xl font-bold pb-10">
          We are currently in the process of partnering with MLH. The following
          3 checkboxes are for this partnership. If we do not end up partnering
          with MLH, your information will not be shared
        </h1>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 text-white text-xl">
          <div className="flex items-start">
            <input
              id="mlhCodeOfConduct"
              type="checkbox"
              {...register("mlhCodeOfConduct")}
              className="mr-3 mt-1 w-8 h-8"
            />
            <label htmlFor="mlhCodeOfConduct">
              I have read and agree to the MLH Code of Conduct. (
              <a
                href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                className="underline"
              >
                https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md
              </a>
              ). *
            </label>
          </div>
          {errors.mlhCodeOfConduct && (
            <p className="text-red-500 text-s italic">
              {errors.mlhCodeOfConduct.message}
            </p>
          )}
          <div className="flex items-start">
            <input
              id="mlhPrivacyPolicy"
              type="checkbox"
              {...register("mlhPrivacyPolicy")}
              className="mr-3 mt-1 w-32 h-8"
            />
            <label htmlFor="mlhPrivacyPolicy">
              I authorize you to share my application/registration information
              with Major League Hacking for event administration, ranking, and
              MLH administration in-line with the MLH Privacy Policy (
              <a
                href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                className="underline"
              >
                https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md
              </a>
              ). I further agree to the terms of both the MLH Contest Terms and
              Conditions (
              <a
                href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                className="underline"
              >
                https://github.com/MLH/mlh-policies/blob/main/contest-terms.md
              </a>
              ) and the MLH Privacy Policy (
              <a
                href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                className="underline"
              >
                https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md
              </a>
              ). *
            </label>
          </div>
          {errors.mlhPrivacyPolicy && (
            <p className="text-red-500 text-s italic">
              {errors.mlhPrivacyPolicy.message}
            </p>
          )}
          <div className="flex items-start">
            <input
              id="mlhEmails"
              type="checkbox"
              {...register("mlhEmails")}
              className="mr-3 mt-1 w-8 h-8"
            />
            <label htmlFor="mlhEmails">
              I authorize MLH to send me occasional emails about relevant
              events, career opportunities, and community announcements.
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-800 rounded-lg text-white mt-10"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;

// "use client";

// import { SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const validationSchema = z
//   .object({
//     firstName: z.string().min(1, { message: "Firstname is required" }),
//     lastName: z.string().min(1, { message: "Lastname is required" }),
//     email: z.string().min(1, { message: "Email is required" }).email({
//       message: "Must be a valid email",
//     }),
//     password: z
//       .string()
//       .min(6, { message: "Password must be atleast 6 characters" }),
//     confirmPassword: z
//       .string()
//       .min(1, { message: "Confirm Password is required" }),
//     terms: z.literal(true, {
//       errorMap: () => ({ message: "You must accept Terms and Conditions" }),
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Password don't match",
//   });

// type ValidationSchema = z.infer<typeof validationSchema>;

// const registrationForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ValidationSchema>({
//     resolver: zodResolver(validationSchema),
//   });

//   const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

//   return (
//     <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
//       <div className="mb-4 md:flex md:justify-between">
//         <div className="mb-4 md:mr-2 md:mb-0">
//           <label
//             className="block mb-2 text-sm font-bold text-gray-700"
//             htmlFor="firstName"
//           >
//             First Name
//           </label>
//           <input
//             className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
//               errors.firstName && "border-red-500"
//             } rounded appearance-none focus:outline-none focus:shadow-outline`}
//             id="firstName"
//             type="text"
//             placeholder="First Name"
//             {...register("firstName")}
//           />
//           {errors.firstName && (
//             <p className="text-xs italic text-red-500 mt-2">
//               {errors.firstName?.message}
//             </p>
//           )}
//         </div>
//         <div className="md:ml-2">
//           <label
//             className="block mb-2 text-sm font-bold text-gray-700"
//             htmlFor="lastName"
//           >
//             Last Name
//           </label>
//           <input
//             className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
//               errors.lastName && "border-red-500"
//             } rounded appearance-none focus:outline-none focus:shadow-outline`}
//             id="lastName"
//             type="text"
//             placeholder="Last Name"
//             {...register("lastName")}
//           />
//           {errors.lastName && (
//             <p className="text-xs italic text-red-500 mt-2">
//               {errors.lastName?.message}
//             </p>
//           )}
//         </div>
//       </div>
//       <div className="mb-4">
//         <label
//           className="block mb-2 text-sm font-bold text-gray-700"
//           htmlFor="email"
//         >
//           Email
//         </label>
//         <input
//           className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
//             errors.email && "border-red-500"
//           } rounded appearance-none focus:outline-none focus:shadow-outline`}
//           id="email"
//           type="email"
//           placeholder="Email"
//           {...register("email")}
//         />
//         {errors.email && (
//           <p className="text-xs italic text-red-500 mt-2">
//             {errors.email?.message}
//           </p>
//         )}
//       </div>
//       <div className="mb-4 md:flex md:justify-between">
//         <div className="mb-4 md:mr-2 md:mb-0">
//           <label
//             className="block mb-2 text-sm font-bold text-gray-700"
//             htmlFor="password"
//           >
//             Password
//           </label>
//           <input
//             className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
//               errors.password && "border-red-500"
//             } rounded appearance-none focus:outline-none focus:shadow-outline`}
//             id="password"
//             type="password"
//             {...register("password")}
//           />
//           {errors.password && (
//             <p className="text-xs italic text-red-500 mt-2">
//               {errors.password?.message}
//             </p>
//           )}
//         </div>
//         <div className="md:ml-2">
//           <label
//             className="block mb-2 text-sm font-bold text-gray-700"
//             htmlFor="c_password"
//           >
//             Confirm Password
//           </label>
//           <input
//             className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
//               errors.confirmPassword && "border-red-500"
//             } rounded appearance-none focus:outline-none focus:shadow-outline`}
//             id="c_password"
//             type="password"
//             {...register("confirmPassword")}
//           />
//           {errors.confirmPassword && (
//             <p className="text-xs italic text-red-500 mt-2">
//               {errors.confirmPassword?.message}
//             </p>
//           )}
//         </div>
//       </div>
//       <div className="mb-4">
//         <input type="checkbox" id="terms" {...register("terms")} />
//         <label
//           htmlFor="terms"
//           className={`ml-2 mb-2 text-sm font-bold ${
//             errors.terms ? "text-red-500" : "text-gray-700"
//           }`}
//         >
//           Accept Terms & Conditions
//         </label>
//         {errors.terms && (
//           <p className="text-xs italic text-red-500 mt-2">
//             {errors.terms?.message}
//           </p>
//         )}
//       </div>
//       <div className="mb-6 text-center">
//         <button
//           className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
//           type="submit"
//         >
//           Register Account
//         </button>
//       </div>
//       <hr className="mb-6 border-t" />
//       <div className="text-center">
//         <a
//           className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
//           href="#test"
//         >
//           Forgot Password?
//         </a>
//       </div>
//       <div className="text-center">
//         <a
//           className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
//           href="./index.html"
//         >
//           Already have an account? Login!
//         </a>
//       </div>
//     </form>
//   );
// };

// export default registrationForm;
