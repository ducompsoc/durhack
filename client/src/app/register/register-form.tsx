"use client"

import * as React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@durhack/web-components/ui/button"
import { Checkbox } from "@durhack/web-components/ui/checkbox"
import {
  ComboBox,
  ComboBoxButton,
  ComboBoxContent,
  ComboBoxTrigger,
} from "@durhack/web-components/ui/combobox"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@durhack/web-components/ui/form"
import { Input } from "@durhack/web-components/ui/input"
import { PhoneInput } from "@durhack/web-components/ui/phone-number-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@durhack/web-components/ui/select"

import "@/lib/zod-phone-extension"
import "@/lib/zod-iso3-extension"
import Link from "next/link"

type RegisterFormFields = {
  firstNames: string
  lastNames: string
  age: string
  phoneNumber: string
  email: string
  school: string
  graduationYear: string
  levelOfStudy: string
  countryOfResidence: string
  mlhCodeOfConductAcceptance: boolean | 'indeterminate'
  mlhPoliciesAcceptance: boolean | 'indeterminate'
  mlhMarketingAcceptance: boolean | 'indeterminate'
}

const registerFormSchema = z.object({
  firstNames: z.string().trim().min(1).max(256),
  lastNames: z.string().trim().min(1).max(256),
  age: z.coerce.number({ invalid_type_error: "Please provide a valid age." })
    .positive("Please provide a valid age.")
    .min(16, { message: "Age must be >= 16" })
    .max(256, { message: "Ain't no way you're that old." })
    .int("Please provide your age rounded down to the nearest integer."),
  phoneNumber: z.string().phone(),
  email: z.string().email(),
  school: z.string(),
  graduationYear: z.coerce.number({ invalid_type_error: "Please provide a valid year." })
    .positive("Please provide a valid year.")
    .int("Oh, come on. Really?")
    .min(1900, { message: "Be serious. You didn't graduate before 1900." }),
  levelOfStudy: z.enum([
    "less-than-secondary",
    "secondary",
    "undergraduate-2-year",
    "undergraduate-3-or-more-years",
    "graduate",
    "bootcamp",
    "vocational-or-apprenticeship",
    "post-doctorate",
    "other",
    "not-a-student",
    "prefer-not-to-answer",
  ]),
  countryOfResidence: z.string().iso3(),
  mlhCodeOfConductAcceptance: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
  mlhPoliciesAcceptance: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
  mlhMarketingAcceptance: z.boolean(),
})

type RegisterFormProps = {
  schoolOptions: { label: string, value: string }[]
  countryOptions: { label: string, value: string, emoji: string}[]
}

export function RegisterForm({schoolOptions, countryOptions, ...props}: React.HTMLAttributes<HTMLFormElement> & RegisterFormProps) {
  const form = useForm<RegisterFormFields, any, z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstNames: "",
      lastNames: "",
      age: "",
      phoneNumber: "",
      email: "",
      school: undefined,
      graduationYear: "",
      levelOfStudy: undefined,
      countryOfResidence: undefined,
      mlhCodeOfConductAcceptance: false,
      mlhPoliciesAcceptance: false,
      mlhMarketingAcceptance: false,
    }
  })

  async function onSubmit(values: z.infer<typeof registerFormSchema>): Promise<void> {
    console.log(values)
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1" {...props}>
        <FormField
          control={form.control}
          name="firstNames"
          render={({ field}) => (
            <FormItem>
              <FormLabel>First name(s)</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name(s)</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" inputMode="numeric" placeholder="18" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput
                  countrySelectProps={{ prominentCountries: new Set(["GB"]) }}
                  defaultCountry="GB"
                  placeholder="+44 1234 567890"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="abcd12@durham.ac.uk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="school"
          render={({ field: {ref, ...field} } ) => (
            <FormItem>
              <FormLabel>Educational Institution</FormLabel>
              <ComboBox<string>
                placeholder="Select institution..."
                options={schoolOptions}
                prominentOptions={new Set(["Durham University"])}
                {...field}
              >
                <ComboBoxTrigger>
                  <FormControl>
                    <ComboBoxButton size="form" />
                  </FormControl>
                </ComboBoxTrigger>
                <ComboBoxContent />
              </ComboBox>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="graduationYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Graduation Year</FormLabel>
              <FormControl>
                <Input type="number" inputMode="numeric" placeholder="2027" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="levelOfStudy"
          render={({ field: {onChange, value, ...field} }) => (
            <FormItem>
              <FormLabel>Level of Study</FormLabel>
              <Select onValueChange={onChange} defaultValue={value} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level of study..." className="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="less-than-secondary">Less than Secondary/High School</SelectItem>
                  <SelectItem value="secondary">Secondary/High School</SelectItem>
                  <SelectItem value="undergraduate-2-year">Undergraduate University (2 year)</SelectItem>
                  <SelectItem value="undergraduate-3-or-more-years">Undergraduate University (3+ years)</SelectItem>
                  <SelectItem value="graduate">Graduate University (Masters&apos;, etc)</SelectItem>
                  <SelectItem value="bootcamp">Code School/Bootcamp</SelectItem>
                  <SelectItem value="vocational-or-apprenticeship">Vocational/Trade Program or Apprenticeship</SelectItem>
                  <SelectItem value="post-doctorate">Post Doctorate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="not-a-student">I’m not currently a student</SelectItem>
                  <SelectItem value="prefer-not-to-answer">Prefer not to answer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="countryOfResidence"
          render={({ field: {ref, ...field} } ) => (
            <FormItem>
              <FormLabel>Country of Residence</FormLabel>
              <ComboBox<string>
                placeholder="Select country..."
                options={countryOptions}
                prominentOptions={new Set(["GBR"])}
                {...field}
              >
                <ComboBoxTrigger>
                  <FormControl>
                    <ComboBoxButton size="form" />
                  </FormControl>
                </ComboBoxTrigger>
                <ComboBoxContent />
              </ComboBox>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mlhCodeOfConductAcceptance"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    className="mt-[0.2em] lg:mt-0"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    required
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    MLH Code of Conduct
                  </FormLabel>
                  <FormDescription>
                    I have read and agree to the{" "}
                    <Link className="underline" href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md">MLH Code of Conduct</Link>.
                  </FormDescription>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mlhPoliciesAcceptance"
          render={({field}) => (
            <FormItem>
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    className="mt-[0.2em] lg:mt-0"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    required
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    MLH Policies, Terms & Conditions
                  </FormLabel>
                  <FormDescription>
                    I authorize DU Computing Society to share my application/registration information with Major{" "}
                    League Hacking for event administration, ranking, and MLH administration in-line with the{" "}
                    <Link className="underline" href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md">
                      MLH Privacy Policy
                    </Link>.
                  </FormDescription>
                  <FormDescription>
                    I further agree to the terms of both the{" "}
                      <Link className="underline" href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md">
                        MLH Contest Terms and Conditions
                      </Link>{" "}
                      and the{" "}
                      <Link className="underline" href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md">
                        MLH Privacy Policy
                      </Link>.
                  </FormDescription>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mlhMarketingAcceptance"
          render={({field}) => (
            <FormItem>
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    className="mt-[0.2em] lg:mt-0"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    MLH Marketing
                  </FormLabel>
                  <FormDescription>
                    I authorize MLH to send me occasional emails about relevant events, career opportunities, and{" "}
                    community announcements.
                  </FormDescription>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*
        # Potentially Missing
        - T-Shirt size
        - Gender
        - Pronouns (multi-select)
        - Race/ethnicity
        - Sexuality
        - Degree/course title
        - Highest level of formal education completed
        - 'What do you want to get out of DurHack?'
        - 'Do you identify as part of an underrepresented group in the technology industry?'
         */}

        <Button variant="default" className="w-full border border-input !mt-3" type="submit">Register</Button>
      </form>
    </Form>
  )
}
