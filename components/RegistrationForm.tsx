"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";
import InputField from "./InputField";
import SelectField from "./SelectField";
import SearchableSelectField from "./SearchableSelectField";
import TextAreaField from "./TextAreaField";
import PhoneInput from "./PhoneInput";
import ComplexInputWrapper from "./ComplexInputWrapper";
import { formSchema, formSchemaType } from "../utils/formSchema";
import { fetchCSVOptions } from "../utils/fetchCSVOptions";
import { formSubmission } from "../utils/formSubmission";
import { signOutAction } from "../utils/signOutAction";
import { getAgeOptions } from "../utils/formAssets/formAssets";
import { options } from "../utils/formAssets/formAssets";

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const RegistrationForm: React.FC = () => {
  const { data: session } = useSession();
  const [countryOptions, setCountryOptions] = useState<{ label: string; value: string }[]>([]);
  const [schoolOptions, setSchoolOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchAndSetOptions = async () => {
      const { countryOptions, schoolOptions } = await fetchCSVOptions();
      setCountryOptions(countryOptions);
      setSchoolOptions(schoolOptions);
    };

    fetchAndSetOptions();
  }, []);

  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<formSchemaType> = async (data) => {
    try {
      await formSubmission(data, session);
      reset();
    } catch (error) {
      console.error("Error during form submission: ", error);
    }
  };

  const copyQuestionsToClipboard = () => {
    const questions = `
    1. Why are you running 

    2. How are you running

    3. Where are you running
    `;
    navigator.clipboard.writeText(questions).then(() => {
      toast.success("Long answer questions copied to clipboard!");
    }, (err) => {
      toast.error("Could not copy text: ", err);
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-8 text-white">
      {/* For debugging purposes */}
      <form action={signOutAction}>
        <Button className="flex h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-3 text-sm font-medium text-white shadow-lg transition duration-200 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-600 hover:to-red-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          Sign Out
        </Button>
      </form>
      <div>{session && <h1>{JSON.stringify(session.user)}</h1>}</div> 
      
      <h1 className="text-white text-4xl font-bold my-6">Hacker Information 🌟 </h1>
      <hr className="border-white mb-12" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-14">
          <InputField
            id="firstName"
            label="First Name *"
            registerOptions={register("firstName")}
            placeholder="John"
            error={errors.firstName}
          />
          <InputField
            id="lastName"
            label="Last Name *"
            registerOptions={register("lastName")}
            placeholder="Doe"
            error={errors.lastName}
          />
          <SelectField
            id="age"
            label="Age *"
            control={control}
            options={getAgeOptions().map((age) => ({ label: age.toString(), value: age }))}
            className="col-span-1"
            error={errors.age}
          />
          <InputField
            id="email"
            label="Email *"
            registerOptions={register("email")}
            placeholder="Enter email"
            type="email"
            error={errors.email}
          />
          <ComplexInputWrapper>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  defaultCountry="CA"
                  id="phoneNumber"
                  label="Phone Number *"
                  registerOptions={register("phoneNumber")}
                  onChange={field.onChange}
                  error={errors.phoneNumber}
                />
              )}
            />
          </ComplexInputWrapper>
          <SearchableSelectField
            id="school"
            label="School *"
            control={control}
            options={schoolOptions}
            className="col-span-1"
            error={errors.school}
          />
          <SelectField
            id="levelOfStudy"
            label="Level of Study *"
            control={control}
            options={options.levelsOfStudy.map((option) => ({ label: option, value: option }))}
            className="col-span-1"
            error={errors.levelOfStudy}
          />
          <SelectField
            id="fieldOfStudy"
            label="Field of Study *"
            control={control}
            options={options.fieldsOfStudy.map((option) => ({ label: option, value: option }))}
            className="col-span-1"
            error={errors.fieldOfStudy}
          />
          <SearchableSelectField
            id="countryOfResidence"
            label="Country of Residence *"
            control={control}
            options={countryOptions}
            className="col-span-1"
            error={errors.countryOfResidence}
          />
          <ComplexInputWrapper>
            <InputField
              id="address"
              label="Address"
              registerOptions={register("address")}
              placeholder="Enter address"
              error={errors.address}
            />
          </ComplexInputWrapper>
          <SelectField
            id="dietaryRestrictions"
            label="Dietary Restrictions *"
            control={control}
            options={options.dietaryRestrictions.map((option) => ({ label: option, value: option }))}
            className="col-span-1"
            error={errors.dietaryRestrictions}
          />
          <InputField
            id="other"
            label="Other"
            registerOptions={register("other")}
            placeholder="Other dietary restrictions..."
            error={errors.other}
          />
          <SelectField
            id="tShirtSize"
            label="T-shirt Size *"
            control={control}
            options={options.tShirtSizes.map((option) => ({ label: option, value: option }))}
            className="col-span-1"
            error={errors.tShirtSize}
          />
          <div className="col-span-1">
            <label className="block my-4 text-xl font-semibold" htmlFor="resume">
              Resume 
            </label>
            <Input
              id="resume"
              type="file"
              {...register("resume")}
              className="focus:border-none h-15"
            />
            {errors.resume && <p className="text-red-500 text-s italic mt-2">{errors.resume.message?.toString()}</p>}
          </div>
          <InputField
            id="githubProfile"
            label="GitHub Profile Link"
            registerOptions={register("githubProfile")}
            placeholder=""
            error={errors.githubProfile}
          />
          <InputField
            id="linkedin"
            label="LinkedIn"
            registerOptions={register("linkedin")}
            placeholder=""
            error={errors.linkedin}
          />
          <InputField
            id="personalWebsite"
            label="Personal Website"
            registerOptions={register("personalWebsite")}
            placeholder=""
            error={errors.personalWebsite}
          />
          <InputField
            id="additionalLinks"
            label="Additional Links"
            registerOptions={register("additionalLinks")}
            placeholder=""
            error={errors.additionalLinks}
          />
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-white text-4xl font-bold my-6 mt-24">
            Long Answer Questions
          </h1>
          <Button type="button" onClick={copyQuestionsToClipboard} className="py-2 text-white mt-20">
            <MdContentCopy className="mr-2 text-lg" />
            Copy Questions to Clipboard
          </Button>
        </div>
        <hr className="border-white pb-6" />
        <div className="grid grid-cols-1 gap-x-12 gap-y-10">
          <TextAreaField
            id="q1"
            label="Why are you running *"
            registerOptions={register("q1")}
            placeholder="Type your answer"
            error={errors.q1}
          />
          <TextAreaField
            id="q2"
            label="How are you running *"
            registerOptions={register("q2")}
            placeholder="Type your answer"
            error={errors.q2}
          />
          <TextAreaField
            id="q3"
            label="Where are you running *"
            registerOptions={register("q3")}
            placeholder="Type your answer"
            error={errors.q3}
          />
        </div>

        <h1 className="text-white text-4xl font-bold mb-6 mt-10">
          Optional Demographic Questions
        </h1>
        <hr className="border-white pb-6" />
        <h1 className="text-white text-xl font-bold mb-6">
          The answers to these questions will not affect your application in any way
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">
          <SelectField
            id="underrepresented"
            label="Do you identify as part of an underrepresented group in the technology industry?"
            control={control}
            options={options.underrepresented.map((option) => ({ label: option, value: option }))}
            className="col-span-2"
            error={errors.underrepresented}
          />
          <SelectField
            id="gender"
            label="Gender"
            control={control}
            options={options.genders.map((option) => ({ label: option, value: option }))}
            className="col-span-2"
            error={errors.gender}
          />
          <SelectField
            id="pronouns"
            label="Pronouns"
            control={control}
            options={options.pronouns.map((option) => ({ label: option, value: option }))}
            className="col-span-2"
            error={errors.pronouns}
          />
          <SelectField
            id="ethnicity"
            label="Race/Ethnicity"
            control={control}
            options={options.ethnicities.map((option) => ({ label: option, value: option }))}
            className="col-span-2"
            error={errors.ethnicity}
          />
          <SelectField
            id="sexuality"
            label="Do you consider yourself to be any of the following?"
            control={control}
            options={options.sexualities.map((option) => ({ label: option, value: option }))}
            className="col-span-2"
            error={errors.sexuality}
          />
        </div>
        <hr className="border-white pb-6 mt-10" />
        <h1 className="text-white text-xl font-bold pb-10">
          We are currently in the process of partnering with MLH. The following 3 checkboxes are for this partnership. If we do not end up partnering with MLH, your information will not be shared
        </h1>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 text-white text-xl">
          <Controller
            name="mlhCodeOfConduct"
            control={control}
            render={({ field }) => (
              <div className="flex items-start">
                <Checkbox
                  id="mlhCodeOfConduct"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                  className="mr-6 mt-1 w-6 h-6"
                />
                <label htmlFor="mlhCodeOfConduct">
                  I have read and agree to the {' '}
                  <a href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" className="underline">
                  MLH Code of Conduct
                  </a>
                  . *
                </label>
              </div>
            )}
          />
          {errors.mlhCodeOfConduct && (
            <p className="text-red-500 text-s italic">
              {errors.mlhCodeOfConduct.message}
            </p>
          )}
          <Controller
            name="mlhPrivacyPolicy"
            control={control}
            render={({ field }) => (
              <div className="flex items-start">
                <Checkbox
                  id="mlhPrivacyPolicy"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                  className="mr-6 mt-1 w-6 h-6"
                />
                <label htmlFor="mlhPrivacyPolicy">
                  I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in line with the{' '}
                  <a href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md" className="underline">
                    MLH Privacy Policy
                  </a>
                  . I further agree to the terms of both the{' '}
                  <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" className="underline">
                    MLH Contest Terms and Conditions
                  </a>
                  {' '}and the{' '}
                  <a href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md" className="underline">
                    MLH Privacy Policy
                  </a>
                  . *
                </label>
              </div>
            )}
          />
          {errors.mlhPrivacyPolicy && (
            <p className="text-red-500 text-s italic">
              {errors.mlhPrivacyPolicy.message}
            </p>
          )}
          <Controller
            name="mlhEmails"
            control={control}
            render={({ field }) => (
              <div className="flex items-start">
                <Checkbox
                  id="mlhEmails"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                  className="mr-6 mt-1 w-6 h-6"
                />
                <label htmlFor="mlhEmails">
                  I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.
                </label>
              </div>
            )}
          />
        </div>

        <Button type="submit" className="w-full py-2 text-white mt-10">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
