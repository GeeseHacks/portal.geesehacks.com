"use client";

import React, { useState, useEffect } from "react";
import {
  SubmitHandler,
  useForm,
  UseFormRegisterReturn,
  Controller,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { options } from "./formAssets/formAssets";
import { getAgeOptions } from "./formAssets/formAssets";
import { signOutAction } from "./utils/signOutAction";
import { useSession } from "next-auth/react";
import { fetchCSV } from "./formAssets/csvUtils";
import Select from "react-select";
import toast from "react-hot-toast";

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
      } rounded-lg text-black focus:outline-none`}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-s italic">{error}</p>}
  </div>
);

interface SelectFieldProps {
  id: string;
  label: string;
  control: any;
  options: any[];
  className?: string;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  control,
  options,
  className,
  error,
}) => (
  <div className={className}>
    <label className="block mb-2 text-xl font-semibold" htmlFor={id}>
      {label}
    </label>
    <Controller
      name={id}
      control={control}
      render={({ field: { onChange, value, name, ref } }) => (
        <Select
          styles={customStyles}
          className={`text-black ${
            error ? "border-red-500 border-2" : "border-gray-700"
          }`}
          classNamePrefix="react-select"
          placeholder=""
          options={options}
          value={options.find((c) => c.value === value)}
          onChange={(val) => onChange(val.value)}
        />
      )}
    />
    {error && <p className="text-red-500 text-s italic">{error}</p>}
  </div>
);

const customStyles = {
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    width: "100%",
    padding: "0.13rem",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#374151" : "#374151",
    "&:hover": {
      borderColor: state.isFocused ? "#374151" : "#374151",
    },
    boxShadow: "none",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#9ca3af",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "black",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "black",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "black",
  }),
};

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
      } rounded-lg text-black h-48 focus:outline-none`}
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
          className="w-full p-2 border border-gray-700 rounded-lg text-black focus:outline-none"
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
  phoneNumber: z.string().regex(/^\+\d{1,3}\s\d{7,15}$/, {
    message: "Phone number must be in the format +CountryCode PhoneNumber",
  }),
  school: z.string().min(1, { message: "School is required" }),
  levelOfStudy: z.string().min(1, { message: "Level of study is required" }),
  countryOfResidence: z.string().min(1, { message: "Country is required" }),
  dietaryRestrictions: z
    .string()
    .min(1, { message: "Dietary restriction is required" }),
  age: z.number().min(1, { message: "Age is required" }),
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
    .max(1000, {
      message: "Your answer should not be longer than 250 characters",
    }),
  q2: z
    .string()
    .min(1, { message: "Please input your answer to this question" })
    .max(1000, {
      message: "Your answer should not be longer than 250 characters",
    }),
  q3: z
    .string()
    .min(1, { message: "Please input your answer to this question" })
    .max(1000, {
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
  const { data: session } = useSession();
  const [countryOptions, setCountryOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [schoolOptions, setSchoolOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const countries = await fetchCSV("/countries.csv");
      const schools = await fetchCSV("/schools.csv");
      console.log("Fetched schools:", schools);
      setCountryOptions(
        countries.map((country) => ({ label: country, value: country }))
      );
      setSchoolOptions(
        schools.map((school) => ({ label: school, value: school }))
      );
    };

    fetchOptions();
  }, []);

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const watchAllFields = watch();

  const onSubmit: SubmitHandler<formSchemaType> = async (data) => {
    console.log("form submitted!");
    console.log(data);

    try {
      if (!session?.user?.id) {
        throw new Error("User is not authenticated");
      }

      const userId = Number(session.user.id);
      const resumeFile = data.resume[0];
      const filename = encodeURIComponent(resumeFile.name);

      //Upload the resume file and get the URL
      const uploadResponse = await fetch(`/api/resume?filename=${filename}`, {
        method: "POST",
        body: resumeFile,
      });
      const blob = await uploadResponse.json();
      const resumeUrl = blob.url;

      const userData = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
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
          MLH_authorize: data.mlhCodeOfConduct && data.mlhPrivacyPolicy,
          optional_consider: data.sexuality,
          optional_gender: data.gender,
          optional_pronouns: data.pronouns,
          optional_race: data.ethnicity,
          t_shirt_size: data.tShirtSize,
          resume: resumeUrl,
          optional_underrepresented: data.underrepresented,
        }),
      });

      const longAnswers = await fetch("/api/application-responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: userId,
          q1: data.q1,
          q2: data.q2,
          q3: data.q3,
        }),
      });

      reset(); //scuffed
    } catch (err) {
      console.error("Submission Error: ", err);
    }
    const tempId = Date.now() % 1000;
    console.log(tempId);
  
    // Create a promise for the form submission process
    const submissionPromise = (async () => {
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
  
        reset(); // Reset the form fields
      } catch (err) {
        throw err;
      }
    })();
  
    toast.promise(submissionPromise, {
      loading: "Submitting form...",
      success: "Form submitted successfully!",
      error: (err) => err.message || "Failed to submit the form",
    });
  };
  

  return (
    <div className="max-w-5xl mx-auto p-8 text-white">
      {/* <button
        className="bg-red-400"
        onClick={() => {
          console.log(formSchema.safeParse(watchAllFields));
          console.log(watchAllFields);
        }}
      >
        TEST TEST TEST
      </button> */}

      {/* Signout button */}
      <form action={signOutAction}>
        <button className="flex h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-3 text-sm font-medium text-white shadow-lg transition duration-200 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-600 hover:to-red-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          Sign Out
        </button>
      </form>
      <button
        onClick={() => {
          console.log(session);
        }}
      >
        Get Usser
      </button>
      <div>{session && <h1>{JSON.stringify(session.user)}</h1>}</div>
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
            control={control}
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
            placeholder="Ex. +1 4161234567"
            error={errors.phoneNumber?.message}
          />

          <SelectField
            id="school"
            label="School *"
            control={control}
            options={schoolOptions}
            className="col-span-1"
            error={errors.school?.message}
          />
          <SelectField
            id="levelOfStudy"
            label="Level of Study *"
            control={control}
            options={options.levelsOfStudy.map((option) => ({
              label: option,
              value: option,
            }))}
            className="col-span-1"
            error={errors.levelOfStudy?.message}
          />
          <SelectField
            id="fieldOfStudy"
            label="Field of Study"
            control={control}
            options={options.fieldsOfStudy.map((option) => ({
              label: option,
              value: option,
            }))}
            className="col-span-1"
            error={errors.fieldOfStudy?.message}
          />
          <SelectField
            id="countryOfResidence"
            label="Country of Residence *"
            control={control}
            options={countryOptions}
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
            control={control}
            options={options.dietaryRestrictions.map((option) => ({
              label: option,
              value: option,
            }))}
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
            control={control}
            options={options.tShirtSizes.map((option) => ({
              label: option,
              value: option,
            }))}
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
            control={control}
            options={options.underrepresented.map((option) => ({
              label: option,
              value: option,
            }))}
            className="col-span-2"
            error={errors.underrepresented?.message}
          />
          <SelectField
            id="gender"
            label="Gender"
            control={control}
            options={options.genders.map((option) => ({
              label: option,
              value: option,
            }))}
            className="col-span-2"
            error={errors.gender?.message}
          />
          <SelectField
            id="pronouns"
            label="Pronouns"
            control={control}
            options={options.pronouns.map((option) => ({
              label: option,
              value: option,
            }))}
            className="col-span-2"
            error={errors.pronouns?.message}
          />
          <SelectField
            id="ethnicity"
            label="Race/Ethnicity"
            control={control}
            options={options.ethnicities.map((option) => ({
              label: option,
              value: option,
            }))}
            className="col-span-2"
            error={errors.ethnicity?.message}
          />
          <SelectField
            id="sexuality"
            label="Do you consider yourself to be any of the following?"
            control={control}
            options={options.sexualities.map((option) => ({
              label: option,
              value: option,
            }))}
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
