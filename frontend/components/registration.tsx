"use client";

import React from "react";
import { useForm } from "react-hook-form";

const generateOptions = (items: string[]) => {
  return items.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
};

const options = {
  ethnicities: [
    "Asian Indian",
    "Black or African",
    "Chinese",
    "Filipino",
    "Guamanian or Chamorro",
    "Hispanic / Latino / Spanish Origin",
    "Japanese",
    "Korean",
    "Middle Eastern",
    "Native American or Alaskan Native",
    "Native Hawaiian",
    "Samoan",
    "Vietnamese",
    "White",
    "Other Asian (Thai, Cambodian, etc)",
    "Other Pacific Islander",
    "Other (Please Specify)",
    "Prefer Not to Answer",
  ],
  schools: ["School 1", "School 2"],
  levelsOfStudy: [
    "High School",
    "Undergraduate University (2 year - community college or similar)",
    "Undergraduate University (3+ year)",
    "Graduate University (Masters, Professional, Doctoral, etc)",
    "Code School / Bootcamp",
    "Other Vocational / Trade Program or Apprenticeship",
    "Post Doctorate",
    "Other",
    "Not a student",
    "Prefer not to answer",
  ],
  fieldsOfStudy: [
    "Computer science, computer engineering, or software engineering",
    "Another engineering discipline (such as civil, electrical, mechanical, etc.)",
    "Information systems, information technology, or system administration",
    "A natural science (such as biology, chemistry, physics, etc.)",
    "Mathematics or statistics",
    "Business discipline (such as accounting, finance, marketing, etc.)",
    "Humanities discipline (such as literature, history, philosophy, etc.)",
    "Social science (such as anthropology, psychology, political science, etc.)",
    "Fine arts or performing arts (such as graphic design, music, studio art, etc.)",
    "Health science (such as nursing, pharmacy, radiology, etc.)",
    "Undecided / No Declared Major",
  ],
  countries: ["USA", "Canada"],
  dietaryRestrictions: [
    "None",
    "Vegetarian",
    "Vegan",
    "Celiac Disease",
    "Kosher",
    "Halal",
  ],
  tShirtSizes: ["Small", "Medium", "Large"],
  genders: [
    "Man",
    "Woman",
    "Non-Binary",
    "Prefer to self-describe",
    "Prefer Not to Answer",
  ],
  pronouns: [
    "She/Her",
    "He/Him",
    "They/Them",
    "She/They",
    "He/They",
    "Prefer Not to Answer",
    "Other",
  ],
  sexualities: [
    "Heterosexual or straight",
    "Gay or lesbian",
    "Bisexual",
    "Different identity",
    "Prefer Not to Answer",
  ],
};

const getAgeOptions = () => {
  return Array.from({ length: 27 }, (_, i) => i + 14).map((age) => (
    <option key={age} value={age}>
      {age}
    </option>
  ));
};

const InputField = ({ id, label, registerOptions, placeholder, type = "text" }) => (
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

const SelectField = ({ id, label, registerOptions, options, className }) => (
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
      {generateOptions(options)}
    </select>
  </div>
);

const TextAreaField = ({ id, label, registerOptions, placeholder }) => (
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

const ComplexInputField = ({ id, label, registerOptions, placeholder, type = "text" }) => (
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

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  school: string;
  levelOfStudy: string;
  countryOfResidence: string;
  dietaryRestrictions: string;
  age: string;
  address: string;
  fieldOfStudy: string;
  tShirtSize: string;
  resume: FileList;
  githubProfile: string;
  linkedin: string;
  personalWebsite: string;
  additionalLinks: string;
  firstLongAnswer: string;
  secondLongAnswer: string;
  other: string;
  underrepresented: string;
  gender: string;
  pronouns: string;
  ethnicity: string;
  sexuality: string;
  mlhCodeOfConduct: boolean;
  mlhPrivacyPolicy: boolean;
  mlhEmails: boolean;
};

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
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
            registerOptions={register("firstName", { required: true })}
            placeholder="John"
          />
          <InputField
            id="lastName"
            label="Last Name *"
            registerOptions={register("lastName", { required: true })}
            placeholder="Doe"
          />
          <SelectField
            id="age"
            label="Age *"
            registerOptions={register("age", { required: true })}
            options={getAgeOptions()}
            className="col-span-1"
          />
          <InputField
            id="email"
            label="Email *"
            registerOptions={register("email", { required: true })}
            placeholder="Enter email"
            type="email"
          />
          <ComplexInputField
            id="phoneNumber"
            label="Phone Number *"
            registerOptions={register("phoneNumber", { required: true })}
            placeholder="123-456-7890"
          />
          <SelectField
            id="school"
            label="School *"
            registerOptions={register("school", { required: true })}
            options={options.schools}
            className="col-span-1"
          />
          <SelectField
            id="levelOfStudy"
            label="Level of Study *"
            registerOptions={register("levelOfStudy", { required: true })}
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
            registerOptions={register("countryOfResidence", { required: true })}
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
            registerOptions={register("dietaryRestrictions", { required: true })}
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
            registerOptions={register("tShirtSize", { required: true })}
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
            registerOptions={register("underrepresented", { required: true })}
            options={["Yes", "No", "Unsure"]}
            className="col-span-2"
          />
          <SelectField
            id="gender"
            label="Gender"
            registerOptions={register("gender", { required: true })}
            options={options.genders}
            className="col-span-2"
          />
          <SelectField
            id="pronouns"
            label="Pronouns"
            registerOptions={register("pronouns", { required: true })}
            options={options.pronouns}
            className="col-span-2"
          />
          <SelectField
            id="ethnicity"
            label="Race/Ethnicity"
            registerOptions={register("ethnicity", { required: true })}
            options={options.ethnicities}
            className="col-span-2"
          />
          <SelectField
            id="sexuality"
            label="Do you consider yourself to be any of the following?"
            registerOptions={register("sexuality", { required: true })}
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
