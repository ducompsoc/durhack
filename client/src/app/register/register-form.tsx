"use client"

import * as React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "durhack-web-components/ui/button"
import {
  ComboBox,
  ComboBoxButton,
  ComboBoxContent,
  ComboBoxTrigger,
} from "durhack-web-components/ui/combobox"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "durhack-web-components/ui/form"
import { Input } from "durhack-web-components/ui/input"
import { PhoneInput } from "durhack-web-components/ui/phone-number-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "durhack-web-components/ui/select"

import "@/lib/zod-phone-extension"
import "@/lib/zod-iso3-extension"

const registerFormSchema = z.object({
  firstNames: z.string().trim().min(1),
  lastNames: z.string().trim().min(1),
  age: z.coerce.number({ message: "Please provide a valid age." })
    .min(16, { message: "Age must be >= 16" })
    .max(256, { message: "Ain't no way you're that old." }),
  phoneNumber: z.string().phone(),
  email: z.string().email(),
  school: z.string(),
  graduationYear: z.coerce.number({ message: "Please provide a valid year." })
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
  countryOfResidence: z.string().iso3()
})

type RegisterFormProps = {
  schoolOptions: { label: string, value: string }[]
  countryOptions: { label: string, value: string, emoji: string}[]
}

export function RegisterForm({schoolOptions, countryOptions, ...props}: React.HTMLAttributes<HTMLFormElement> & RegisterFormProps) {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstNames: "",
      lastNames: "",
      age: undefined,
      phoneNumber: "",
      email: "",
      school: undefined,
      graduationYear: undefined, //
      levelOfStudy: undefined,
    }
  })

  async function onSubmit(values: z.infer<typeof registerFormSchema>): Promise<void> {

  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
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
                    <ComboBoxButton />
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
                  <SelectItem value="undergraduate-3-or-more-years">Undergraduate University (3+ year)</SelectItem>
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
                    <ComboBoxButton />
                  </FormControl>
                </ComboBoxTrigger>
                <ComboBoxContent />
              </ComboBox>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="default" className="w-full border border-input mt-3" type="submit">Register</Button>
      </form>
    </Form>
  )
}
