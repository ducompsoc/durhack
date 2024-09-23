"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@durhack/web-components/ui/button"
import { ComboBox, ComboBoxButton, ComboBoxContent, ComboBoxTrigger } from "@durhack/web-components/ui/combobox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@durhack/web-components/ui/form"
import { Input } from "@durhack/web-components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@durhack/web-components/ui/select"

import { Skeleton } from "@/components/dashboard/skeleton"
import { useApplicationContext } from "@/hooks/use-application-context"
import { updateApplication } from "@/lib/update-application"
import "@/lib/zod-iso3-extension"

type EducationFormFields = {
  university: string
  graduation: string
  levelOfStudy: string
  country: string
}

export type SchoolOption = {
  label: string
  value: string
}

export type CountryOption = {
  label: string
  emoji: string
  value: string
}

const educationFormSchema = z.object({
  university: z.string(),
  graduation: z.coerce
    .number({ invalid_type_error: "Please provide a valid year." })
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
  country: z.string().iso3(),
})

export default function EducationPage() {
  const [schoolOptions, setSchoolOptions] = React.useState<SchoolOption[]>([])
  const [countryOptions, setCountryOptions] = React.useState<CountryOption[]>([])

  const router = useRouter()
  const { application, applicationIsLoading } = useApplicationContext()

  React.useEffect(() => {
    if (applicationIsLoading || !application) return
    if (schoolOptions.length === 0 || countryOptions.length === 0) return
    form.reset({
      university: application.university ?? "",
      graduation: application.graduation ?? "",
      levelOfStudy: application.levelOfStudy ?? "",
      country: application.country ?? "",
    })
  }, [applicationIsLoading, application, schoolOptions, countryOptions])

  React.useEffect(() => {
    async function fetchSchoolOptions() {
      const response = await fetch("/api/fetchSchools")
      const data = await response.json()
      setSchoolOptions(data.schoolOptions)
    }

    async function fetchCountryOptions() {
      const response = await fetch("/api/fetchCountries")
      const data = await response.json()
      setCountryOptions(data.countryOptions)
    }

    fetchSchoolOptions()
    fetchCountryOptions()
  }, [])

  const form = useForm<EducationFormFields, unknown, z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      university: "",
      graduation: "",
      levelOfStudy: "",
      country: "",
    },
  })

  async function onSubmit(values: z.infer<typeof educationFormSchema>): Promise<void> {
    await updateApplication("education", values)
    router.push("/dashboard/cv")
  }

  function getForm() {
    return (
      <>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="university"
            render={({ field: { ref, value, ...field } }) => (
              <FormItem>
                <FormLabel>Educational Institution</FormLabel>
                <ComboBox<string>
                  placeholder={value || "Please select..."}
                  options={schoolOptions}
                  prominentOptions={new Set(["Durham University"])}
                  value={value}
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
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="graduation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Graduation Year</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="levelOfStudy"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>Level of Study</FormLabel>
                <Select onValueChange={onChange} value={value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue className="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="less-than-secondary">Less than Secondary/High School</SelectItem>
                    <SelectItem value="secondary">Secondary/High School</SelectItem>
                    <SelectItem value="undergraduate-2-year">Undergraduate University (2 year)</SelectItem>
                    <SelectItem value="undergraduate-3-or-more-years">Undergraduate University (3+ years)</SelectItem>
                    <SelectItem value="graduate">Graduate University (Masters&apos, etc)</SelectItem>
                    <SelectItem value="bootcamp">Code School/Bootcamp</SelectItem>
                    <SelectItem value="vocational-or-apprenticeship">
                      Vocational/Trade Program or Apprenticeship
                    </SelectItem>
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
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>Country of Residence</FormLabel>
                { /* TODO: this is supposed to be a combobox. why isn't it a combobox? */ }
                <Select onValueChange={onChange} value={value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue className="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countryOptions.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.emoji} {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-16 flex justify-center">
          <Button
            variant="default"
            className="py-2 px-4 text-center rounded-sm text-white bg-white bg-opacity-15 hover:bg-green-500 hover:cursor-pointer hover:shadow-[0_0px_50px_0px_rgba(34,197,94,0.8)] transition-all"
            type="submit"
          >
            Save Progress
          </Button>
        </div>
      </>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-2xl">Education & Location Information</h2>
        {applicationIsLoading || schoolOptions.length === 0 || countryOptions.length === 0 ? (
          <Skeleton rows={4} className="mt-4" />
        ) : (
          getForm()
        )}
      </form>
    </Form>
  )
}
