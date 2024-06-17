"use client";

import React from "react";
import { useForm } from "react-hook-form";

const ethnicities = [
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
];

const ethnicityOptions = ethnicities.map((ethnicity, index) => (
  <option key={index} value={ethnicity}>
    {ethnicity}
  </option>
));

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
          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="firstName"
            >
              First Name *
            </label>
            <input
              id="firstName"
              type="text"
              {...register("firstName", { required: true })}
              className="w-full p-2 border border-gray-700 rounded-lg text-black"
              placeholder="John"
            />
          </div>

          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="lastName"
            >
              Last Name *
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName", { required: true })}
              className="w-full p-2 border border-gray-700 rounded-lg text-black"
              placeholder="Doe"
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-xl font-bold" htmlFor="age">
              Age *
            </label>
            <select
              id="age"
              {...register("age", { required: true })}
              className="custom-select w-1/2 p-2 border border-gray-700 rounded-lg text-black"
            >
              <option value=""></option>
              {Array.from({ length: 27 }, (_, i) => i + 14).map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-xl font-semibold" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="w-full p-2 border border-gray-700 rounded-lg text-black"
              placeholder="Enter email"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div className="col-span-1">
                <label
                  className="block mb-2 text-xl font-bold"
                  htmlFor="phoneNumber"
                >
                  Phone Number *
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  {...register("phoneNumber", { required: true })}
                  className="w-full p-2 border border-gray-700 rounded-lg text-black"
                  placeholder="123-456-7890"
                />
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="school"
            >
              School *
            </label>
            <select
              id="school"
              {...register("school", { required: true })}
              className="custom-select w-full p-2 border border-gray-700 rounded-lg text-black"
            >
              <option value=""></option>
              <option value="School 1">School 1</option>
              <option value="School 2">School 2</option>
            </select>
          </div>

          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-bold"
              htmlFor="levelOfStudy"
            >
              Level of Study *
            </label>
            <select
              id="levelOfStudy"
              {...register("levelOfStudy", { required: true })}
              className="custom-select w-full p-2 border border-gray-700 rounded-lg text-black"
            >
              <option value=""></option>
              <option value="High School">Secondary/High School</option>
              <option value="Undergraduate">
                Undergraduate University (2 year - community college or similar)
              </option>
              <option value="Undergraduate">
                Undergraduate University (3+ year)
              </option>
              <option value="Graduate">
                Graduate University (Masters, Professional, Doctoral, etc)
              </option>
              <option value="Code School">Code School / Bootcamp</option>
              <option value="Apprentices">
                Other Vocational / Trade Program or Apprenticeship
              </option>
              <option value="Post Doctorate">Post Doctorate</option>
              <option value="Other">Other</option>
              <option value="Not a student">I'm currently not a student</option>
              <option value="">Prefer not to answer</option>
            </select>
          </div>

          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="fieldOfStudy"
            >
              Field of Study
            </label>
            <select
              id="fieldOfStudy"
              {...register("fieldOfStudy")}
              className="custom-select w-full p-2 border border-gray-700 rounded-lg text-black"
            >
              <option value=""></option>
              <option value="Computer Science">
                Computer science, computer engineering, or software engineering{" "}
              </option>
              <option value="Engineering">
                Another engineering discipline (such as civil, electrical,
                mechanical, etc.){" "}
              </option>
              <option value="Information Systems">
                Information systems, information technology, or system
                administration{" "}
              </option>
              <option value="Natural science">
                A natural science (such as biology, chemistry, physics, etc.){" "}
              </option>
              <option value="Mathematics">Mathematics or statistics</option>
              <option value="Business discipline">
                Business discipline (such as accounting, finance, marketing,
                etc.){" "}
              </option>
              <option value="Humanities discipline">
                Humanities discipline (such as literature, history, philosophy,
                etc.){" "}
              </option>
              <option value="Social science">
                Social science (such as anthropology, psychology, political
                science, etc.)
              </option>
              <option value="Fine arts">
                Fine arts or performing arts (such as graphic design, music,
                studio art, etc.){" "}
              </option>
              <option value="Health Science">
                Health science (such as nursing, pharmacy, radiology, etc.){" "}
              </option>
              <option value="Undecided">Undecided / No Declared Major </option>
            </select>
          </div>

          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="countryOfResidence"
            >
              Country of Residence *
            </label>
            <select
              id="countryOfResidence"
              {...register("countryOfResidence", { required: true })}
              className="custom-select w-full p-2 border border-gray-700 rounded-lg text-black"
            >
              <option value=""></option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div className="col-span-1">
                <label
                  className="block mb-2 text-xl font-semibold"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address")}
                  className="w-full p-2 border border-gray-700 rounded-lg text-black"
                  placeholder="Enter address"
                />
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="dietaryRestrictions"
            >
              Dietary Restrictions *
            </label>
            <select
              id="dietaryRestrictions"
              {...register("dietaryRestrictions", { required: true })}
              className="custom-select w-full p-2 border border-gray-700 rounded-lg text-black"
            >
              <option value=""></option>
              <option value="None">None</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Celiac Diseas">Celiac Disease</option>
              <option value="Kosher">Kosher</option>
              <option value="Halal">Halal</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-xl font-semibold" htmlFor="other">
              Other
            </label>
            <input
              id="other"
              type="text"
              {...register("other")}
              className="w-full p-2 border border-gray-700 rounded-lg text-black"
              placeholder="Other..."
            />
          </div>

          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="tShirtSize"
            >
              T-shirt Size *
            </label>
            <select
              id="tShirtSize"
              {...register("tShirtSize", { required: true })}
              className="custom-select w-full p-2 border border-gray-700 rounded-lg text-black"
            >
              <option value=""></option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

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

          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="githubProfile"
            >
              GitHub Profile
            </label>
            <input
              id="githubProfile"
              type="text"
              {...register("githubProfile")}
              className="w-full p-2 border border-gray-700 rounded-lg text-black"
            />
          </div>

          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="linkedin"
            >
              LinkedIn
            </label>
            <input
              id="linkedin"
              type="text"
              {...register("linkedin")}
              className="w-full p-2 border border-gray-700 rounded-lg text-black"
            />
          </div>

          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="personalWebsite"
            >
              Personal Website
            </label>
            <input
              id="personalWebsite"
              type="text"
              {...register("personalWebsite")}
              className="w-full p-2 border border-gray-700 rounded-lg text-black"
            />
          </div>

          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="additionalLinks"
            >
              Additional Links
            </label>
            <input
              id="additionalLinks"
              type="text"
              {...register("additionalLinks")}
              className="w-full p-2 border border-gray-700 rounded-lg text-black"
            />
          </div>
        </div>
        <h1 className="text-white text-4xl font-bold mb-6 mt-24">
          Long Answer Questions
        </h1>
        <hr className="border-white pb-6" />
        <div className="grid grid-cols-1 gap-x-12 gap-y-10">
          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="firstLongAnswer"
            >
              Why are you running
            </label>
            <textarea
              id="firstLongAnswer"
              {...register("firstLongAnswer")}
              className="w-full p-2 border border-gray-700 rounded-lg text-black h-48"
              placeholder="Type your answer"
            />
          </div>
          <div className="col-span-1">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="secondLongAnswer"
            >
              How are you running
            </label>
            <textarea
              id="secondLongAnswer"
              {...register("secondLongAnswer")}
              className="w-full p-2 border border-gray-700 rounded-lg text-black h-48"
              placeholder="Type your answer"
            />
          </div>
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
          <div className="col-span-2">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="underrepresented"
            >
              Do you identify as part of an underrepresented group in the
              technology industry?
            </label>
            <select
              id="underrepresented"
              {...register("underrepresented", { required: true })}
              className="custom-select w-full p-2 border border-gray-700 rounded-lg text-black"
            >
              <option value=""></option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Unsure">Unsure</option>
            </select>
          </div>
          <div className="col-span-2">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="dietaryRestrictions"
            >
              Gender
            </label>
            <select
              id="gender"
              {...register("gender", { required: true })}
              className="custom-select w-full p-2 border border-gray-700 rounded-lg text-black"
            >
              <option value=""></option>
              <option value="Man">Man</option>
              <option value="Woman">Woman</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Self describe">Prefer to self-describe</option>
              <option value="No answer">Prefer Not to Answer</option>
            </select>
          </div>
          <div className="col-span-2">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="pronouns"
            >
              Pronouns
            </label>
            <select
              id="pronouns"
              {...register("pronouns", { required: true })}
              className="custom-select w-full p-2 border border-gray-700 rounded-lg text-black"
            >
              <option value=""></option>
              <option value="She/Her">She/Her</option>
              <option value="He/Him">He/Him</option>
              <option value="They/Them">They/Them</option>
              <option value="She/They">She/They</option>
              <option value="He/They">He/They</option>
              <option value="No Answer">Prefer Not to Answer</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-span-2">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="ethnicity"
            >
              Race/Ethnicity
            </label>
            <select
              id="ethnicity"
              {...register("ethnicity", { required: true })}
              className="custom-select w-full p-2 border border-gray-700 rounded-lg text-black"
            >
              <option value=""></option>
              {ethnicityOptions}
            </select>
          </div>
          <div className="col-span-2">
            <label
              className="block mb-2 text-xl font-semibold"
              htmlFor="sexuality"
            >
              Do you consider yourself to be any of the following?
            </label>
            <select
              id="sexuality"
              {...register("sexuality", { required: true })}
              className="custom-select w-full p-2 border border-gray-700 rounded-lg text-black"
            >
              <option value=""></option>
              <option value="Heterosexual">Heterosexual or straight</option>
              <option value="Gay/Lesbian">Gay or lesbian</option>
              <option value="Bisexual">Bisexual</option>
              <option value="Different Identity">Different identity</option>
              <option value="No Answer">Prefer Not to Answer</option>
            </select>
          </div>
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
              className="mr-3 mt-1 w-8 h-8"
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
