"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { options } from "./formAssets/formAssets";
import { getAgeOptions } from "./formAssets/formAssets";

interface InputFieldProps {
  id: string;
  label: string;
  registerOptions: any;
  placeholder: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  registerOptions,
  placeholder,
  type = "text",
}) => (
  <div className="col-span-1">
    <label className="block mb-2 text-xl font-semibold" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      {...registerOptions}
      className="w-full p-2 border border-gray-700 rounded-lg text-black"
      placeholder={placeholder}
    />
  </div>
);

interface SelectFieldProps {
  id: string;
  label: string;
  registerOptions: any;
  options: string[];
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  registerOptions,
  options,
  className,
}) => (
  <div className={className}>
    <label className="block mb-2 text-xl font-semibold" htmlFor={id}>
      {label}
    </label>
    <select
      id={id}
      {...registerOptions}
      className="custom-select w-full p-2 border border-gray-700 rounded-lg text-black"
    >
      <option value=""></option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

interface TextAreaFieldProps {
  id: string;
  label: string;
  registerOptions: any;
  placeholder: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  id,
  label,
  registerOptions,
  placeholder,
}) => (
  <div className="col-span-1">
    <label className="block mb-2 text-xl font-semibold" htmlFor={id}>
      {label}
    </label>
    <textarea
      id={id}
      {...registerOptions}
      className="w-full p-2 border border-gray-700 rounded-lg text-black h-48"
      placeholder={placeholder}
    />
  </div>
);

interface ComplexInputFieldProps {
  id: string;
  label: string;
  registerOptions: any;
  placeholder: string;
  type?: string;
  error?: { message: string };
}

const ComplexInputField: React.FC<ComplexInputFieldProps> = ({
  id,
  label,
  registerOptions,
  placeholder,
  type = "text",
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
      </div>
    </div>
  </div>
);

const formSchema = z.object({
  firstName: z.string({ message: "First name is required" }),
  lastName: z.string({ message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string({ message: "Phone number is required" }),
  school: z.string({ message: "School is required" }),
  levelOfStudy: z.string({ message: "Level of study is required" }),
  countryOfResidence: z.string({ message: "Country is required" }),
  dietaryRestrictions: z.string({ message: "Dietary restriction is required" }),
  age: z.number({ message: "Age is required" }),
  address: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  tShirtSize: z.string({ message: "T-shirt size is required" }),
  resume: z.any().optional(),
  githubProfile: z.string().optional(),
  linkedin: z.string().optional(),
  personalWebsite: z.string().optional(),
  additionalLinks: z.string().optional(),
  firstLongAnswer: z.string().optional(),
  secondLongAnswer: z.string().optional(),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: formSchemaType) => {
    console.log("Form submitted!");
    console.log(formSchema.safeParse(data));
  };

  return (
    <div className="max-w-5xl mx-auto p-8 text-white">
      <h1 className="text-white text-4xl font-bold mb-6">Hacker Information</h1>
      <hr className="border-white pb-6" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-14">
          <InputField
            id="firstName"
            label="First Name *"
            registerOptions={register("firstName")}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-red">{errors.firstName.message}</p>
          )}
          <InputField
            id="lastName"
            label="Last Name *"
            registerOptions={register("lastName")}
            placeholder="Doe"
          />
          <SelectField
            id="age"
            label="Age *"
            registerOptions={register("age")}
            options={getAgeOptions()}
            className="col-span-1"
          />
          <InputField
            id="email"
            label="Email *"
            registerOptions={register("email")}
            placeholder="Enter email"
            type="email"
          />
          <ComplexInputField
            id="phoneNumber"
            label="Phone Number *"
            registerOptions={register("phoneNumber")}
            placeholder="123-456-7890"
          />
          <SelectField
            id="school"
            label="School *"
            registerOptions={register("school")}
            options={options.schools}
            className="col-span-1"
          />
          <SelectField
            id="levelOfStudy"
            label="Level of Study *"
            registerOptions={register("levelOfStudy")}
            options={options.levelsOfStudy}
            className="col-span-1"
          />
          <SelectField
            id="fieldOfStudy"
            label="Field of Study"
            registerOptions={register("fieldOfStudy")}
            options={options.fieldsOfStudy}
            className="col-span-1"
          />
          <SelectField
            id="countryOfResidence"
            label="Country of Residence *"
            registerOptions={register("countryOfResidence")}
            options={options.countries}
            className="col-span-1"
          />
          <ComplexInputField
            id="address"
            label="Address"
            registerOptions={register("address")}
            placeholder="Enter address"
          />
          <SelectField
            id="dietaryRestrictions"
            label="Dietary Restrictions *"
            registerOptions={register("dietaryRestrictions", {
              required: true,
            })}
            options={options.dietaryRestrictions}
            className="col-span-1"
          />
          <InputField
            id="other"
            label="Other"
            registerOptions={register("other")}
            placeholder="Other..."
          />
          <SelectField
            id="tShirtSize"
            label="T-shirt Size *"
            registerOptions={register("tShirtSize")}
            options={options.tShirtSizes}
            className="col-span-1"
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
          />
          <InputField
            id="linkedin"
            label="LinkedIn"
            registerOptions={register("linkedin")}
            placeholder=""
          />
          <InputField
            id="personalWebsite"
            label="Personal Website"
            registerOptions={register("personalWebsite")}
            placeholder=""
          />
          <InputField
            id="additionalLinks"
            label="Additional Links"
            registerOptions={register("additionalLinks")}
            placeholder=""
          />
        </div>
        <h1 className="text-white text-4xl font-bold mb-6 mt-24">
          Long Answer Questions
        </h1>
        <hr className="border-white pb-6" />
        <div className="grid grid-cols-1 gap-x-12 gap-y-10">
          <TextAreaField
            id="firstLongAnswer"
            label="Why are you running"
            registerOptions={register("firstLongAnswer")}
            placeholder="Type your answer"
          />
          <TextAreaField
            id="secondLongAnswer"
            label="How are you running"
            registerOptions={register("secondLongAnswer")}
            placeholder="Type your answer"
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
          />
          <SelectField
            id="gender"
            label="Gender"
            registerOptions={register("gender")}
            options={options.genders}
            className="col-span-2"
          />
          <SelectField
            id="pronouns"
            label="Pronouns"
            registerOptions={register("pronouns")}
            options={options.pronouns}
            className="col-span-2"
          />
          <SelectField
            id="ethnicity"
            label="Race/Ethnicity"
            registerOptions={register("ethnicity")}
            options={options.ethnicities}
            className="col-span-2"
          />
          <SelectField
            id="sexuality"
            label="Do you consider yourself to be any of the following?"
            registerOptions={register("sexuality")}
            options={options.sexualities}
            className="col-span-2"
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
              {...register("mlhCodeOfConduct", { required: true })}
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
          <div className="flex items-start">
            <input
              id="mlhPrivacyPolicy"
              type="checkbox"
              {...register("mlhPrivacyPolicy", { required: true })}
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
          <div className="flex items-start">
            <input
              id="mlhEmails"
              type="checkbox"
              {...register("mlhEmails", { required: false })}
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
