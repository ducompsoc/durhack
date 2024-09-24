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
  preferredName: string
  pronouns: string
  gender: string
  age: string
  phoneNumber: string
  email: string
  school: string
  course: string
  graduationYear: string
  levelOfStudy: string
  countryOfResidence: string
  ethnicity: string
  cvConsent: boolean | 'indeterminate'
  photoConsent: boolean | 'indeterminate'
  dsuPrivacyAcceptance: boolean | 'indeterminate'
  hackathonsUKPrivacyAcceptance: boolean | 'indeterminate'
  hackathonsUKMarketingAcceptance: boolean | 'indeterminate'
  mlhCodeOfConductAcceptance: boolean | 'indeterminate'
  mlhPoliciesAcceptance: boolean | 'indeterminate'
  mlhMarketingAcceptance: boolean | 'indeterminate'
}

const registerFormSchema = z.object({
  firstNames: z.string().trim().min(1).max(256),
  lastNames: z.string().trim().min(1).max(256),
  preferredName: z.string().trim().min(1).max(256),
  pronouns: z.string().trim().min(1).max(30),
  gender: z.enum([
    "male",
    "female",
    "non-binary",
    "other"
  ]),
  age: z.coerce.number({ invalid_type_error: "Please provide a valid age." })
    .positive("Please provide a valid age.")
    .min(16, { message: "Age must be >= 16" })
    .max(256, { message: "Ain't no way you're that old." })
    .int("Please provide your age rounded down to the nearest integer."),
  phoneNumber: z.string().phone(),
  email: z.string().email(),
  school: z.string(),
  course: z.string().trim(),
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
  ethnicity: z.enum([
    "indian",
    "pakistani",
    "bangladeshi",
    "chinese",
    "asianOther",
    "caribbean",
    "african",
    "blackOther",
    "mixedCaribbean",
    "mixedAfrican",
    "mixedAsian",
    "mixedOther",
    "uk",
    "irish",
    "gypsyTraveller",
    "roma",
    "whiteOther",
    "arab",
    "other",
  ]),
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
      preferredName:"",
      pronouns:"",
      gender: undefined,
      age: "",
      phoneNumber: "",
      email: "",
      school: undefined,
      course: "",
      graduationYear: "",
      levelOfStudy: undefined,
      countryOfResidence: undefined,
      ethnicity: undefined,
      cvConsent: false,
      photoConsent: false,
      dsuPrivacyAcceptance: false,
      hackathonsUKPrivacyAcceptance: false,
      hackathonsUKMarketingAcceptance: false,
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
        <h1 className="text-xl"> Personal Details </h1>
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
          name="preferredName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred name</FormLabel>
              <FormControl>
                <Input placeholder="Jon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pronouns"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pronouns</FormLabel>
              <FormControl>
                <Input placeholder="They/Them" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field: {onChange, value, ...field} }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={onChange} defaultValue={value} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender..." className="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
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
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Input placeholder="Computer Science" {...field} />
              </FormControl>
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
          name="ethnicity"
          render={({ field: {onChange, value, ...field} }) => (
            <FormItem>
              <FormLabel>Ethnicity</FormLabel>
              <Select onValueChange={onChange} defaultValue={value} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ethnicity..." className="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="indian">Asian (Indian)</SelectItem>
                  <SelectItem value="pakistani">Asian (Pakistani)</SelectItem>
                  <SelectItem value="bangladeshi">Asian (Bangladeshi)</SelectItem>
                  <SelectItem value="chinese">Asian (Chinese)</SelectItem>
                  <SelectItem value="asianOther">Any other Asian background</SelectItem>
                  
                  <SelectItem value="caribbean">Black (Caribbean)</SelectItem>
                  <SelectItem value="african">Black (African)</SelectItem>
                  <SelectItem value="blackOther">Any other Black, Black British, or Caribbean background</SelectItem>
                  
                  <SelectItem value="mixedCaribbean">Mixed (White and Black Caribbean)</SelectItem>
                  <SelectItem value="mixedAfrican">Mixed (White and Black African)</SelectItem>
                  <SelectItem value="mixedAsian">Mixed (White and Asian)</SelectItem>
                  <SelectItem value="mixedOther">Any other Mixed or multiple ethnic background</SelectItem>

                  <SelectItem value="uk">English, Welsh, Scottish, Northern Irish or British</SelectItem>
                  <SelectItem value="irish">Irish</SelectItem>
                  <SelectItem value="gypsyTraveller">Gypsy or Irish Traveller</SelectItem>
                  <SelectItem value="roma">Roma</SelectItem>
                  <SelectItem value="whiteOther">Any other White background</SelectItem>

                  <SelectItem value="arab">Arab</SelectItem>
                  <SelectItem value="other">Any other ethnic group</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <br></br>
        <h1 className="text-xl">DurHack Details</h1>

        <br></br>
        <h1 className="text-xl">Consent/Permissions</h1>

        <FormField
          control={form.control}
          name="cvConsent"
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
                  CV Sharing
                  </FormLabel>
                  <FormDescription>
                  We pass CVs on to our sponsors, and its a great way to get career opportunities such as internships. We also provide an extra piece of stash as a reward for all our attendees who submit their CV.
                  </FormDescription>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photoConsent"
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
                  Photography Consent
                  </FormLabel>
                  <FormDescription>
                  These images may be used for promotional purposes including on our website/socials, as well as shared with our sponsors and partners.
                  I consent to the use of photographs and/or videos in which I appear for promotional purposes related to the event.
                  </FormDescription>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dsuPrivacyAcceptance"
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
                  Durham Students Union Privacy Notice
                  </FormLabel>
                  <FormDescription>
                  I have read the {""}
                  <Link className="underline" href="#">Durham Students Union (DSU) Privacy notice</Link>
                  {" "}and consent to sharing information with Durham University Computing Society and the DSU.
                  </FormDescription>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hackathonsUKPrivacyAcceptance"
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
                  Hackathons UK Privacy Policy
                  </FormLabel>
                  <FormDescription>
                  I have read the {""}
                  <Link className="underline" href="#">Hackathons UK Privacy Policy</Link>
                  {" "}and authorise you to share my application/registration information with Hackathons UK Limited for event administration, Hackathons UK Limited administration, and with my authorisation email in-line with the Hackathons UK Limited Privacy Policy.
                  </FormDescription>
                  <FormDescription>
                  I understand that this event is a {""}
                  <Link className="underline" href="#">Hackathons UK</Link>
                  {" "}partner event.
                  </FormDescription>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hackathonsUKMarketingAcceptance"
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
                    Hackathons UK Marketing
                  </FormLabel>
                  <FormDescription>
                  I authorise Hackathons UK Limited to send me occasional messages about hackathons and their activities.
                  </FormDescription>
                </div>
              </div>
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
