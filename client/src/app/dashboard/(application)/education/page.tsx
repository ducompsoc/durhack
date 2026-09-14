"use client"

import {
  type DisciplineOfStudy,
  disciplineOfStudyOptions,
  disciplineOfStudySchema,
} from "@durhack/durhack-common/input/discipline-of-study"
import { ComboBox, ComboBoxButton, ComboBoxContent, ComboBoxTrigger } from "@durhack/web-components/ui/combobox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@durhack/web-components/ui/form"
import { Input } from "@durhack/web-components/ui/input"
import { MultiSelect } from "@durhack/web-components/ui/multi-select"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectValueViewport,
} from "@durhack/web-components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import useSWRImmutable from "swr/immutable"
import { z } from "zod/v4"

import { FormSkeleton } from "@/components/dashboard/form-skeleton"
import { FormSubmitButton } from "@/components/dashboard/form-submit-button"
import { siteConfig } from "@/config/site"
import type { Application } from "@/hooks/use-application"
import { useApplicationContext } from "@/hooks/use-application-context"
import { isLoaded } from "@/lib/is-loaded"
import { isString } from "@/lib/type-guards"
import { updateApplication } from "@/lib/update-application"
import { zodIso3 } from "@/lib/zod-iso3-validator"

import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef, useState, useMemo } from "react"

type EducationFormFields = {
  university: string
  graduationYear: unknown
  levelOfStudy: string
  disciplinesOfStudy: DisciplineOfStudy[]
  countryOfResidence: string
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
  university: z.string().trim().min(1, { message: "Please select your institution." }),
  graduationYear: z.coerce
    .number({
      error: (issue) => (issue.input === undefined ? "This field is required" : "Please provide a valid year."),
    })
    .positive("Please provide a valid year.")
    .int("Oh, come on. Really?")
    .min(1900, { error: "Be serious. You didn't graduate before 1900." })
    .max(2100, { error: "What on earth are you studying?!?" }),
  disciplinesOfStudy: z.array(disciplineOfStudySchema).min(1, { error: "Please select your discipline(s) of study." }),
  levelOfStudy: z.enum(
    [
      "secondary",
      "undergraduate-first-year",
      "undergraduate-second-year",
      "undergraduate-third-year-or-higher",
      "graduate",
      "bootcamp",
      "vocational-or-apprenticeship",
      "other",
      "not-a-student",
      "prefer-not-to-answer",
    ],
    { error: "Please select your level of study." },
  ),
  countryOfResidence: zodIso3(),
})

async function optionsFetcher<OptionType>(path: string): Promise<OptionType[]> {
  const url = new URL(path, siteConfig.apiUrl).toString()
  const response = await fetch(url)

  if (!response.ok) throw new Error("Couldn't fetch options")

  return (await response.json()).data as OptionType[]
}

type EducationFormProps = {
  schoolOptions: SchoolOption[]
  countryOptions: CountryOption[]
  application: Application
}

export function VirtualizedComboBox({
  options,
  prominentOptions,
  value,
  onChange,
  placeholder,
}: {
  options: SchoolOption[]
  prominentOptions?: Set<string>
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const filteredOptions = useMemo(() => {
    const query = search.toLowerCase()
    const list = options.filter((opt) => opt.label.toLowerCase().includes(query))
    
    const prominent = list.filter((opt) => prominentOptions?.has(opt.label))
    const rest = list.filter((opt) => !prominentOptions?.has(opt.label))
    
    return [...prominent, ...rest]
  }, [options, search])


  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  })

  const selectedOption = options.find((option) => option.value === value)?.label || prominentOptions

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm border rounded-md bg-background hover:bg-accent hover:text-accent-foreground text-left"
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {selectedOption}
        </span>
        <span className="ml-2 text-xs opacity-50">▼</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-80">
          <div className="p-2 space-y-2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 text-sm"
              autoFocus
            />

            <div
              ref={parentRef}
              className="overflow-auto max-h-[300px] relative"
            >
                {filteredOptions.length === 0 ? (
                  <div
                    className="p-3 text-sm text-center text-muted-foreground"
                  >No institution found</div>
                ) : (
                  <div
                    style={{
                      height: `${rowVirtualizer.getTotalSize()}px`,
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                      const option = filteredOptions[virtualRow.index]
                      return (
                        <div
                          key={virtualRow.key}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start}px)`,
                          }}
                          className="flex items-center px-2 hover:bg-muted/50 cursor-pointer"
                          onClick={() => {
                            onChange(option.value)
                            setOpen(false)
                            setSearch("")
                          }}
                        >
                          {option.label}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
      )}
    </div>
  )
}

/**
 * This component accepts <code>application</code> via props, rather than via
 * <code>useApplicationContext</code>, because it requires the application to already be loaded before being rendered.
 */
function EducationForm({ schoolOptions, countryOptions, application }: EducationFormProps) {
  const router = useRouter()
  const { mutateApplication } = useApplicationContext()

  const form = useForm<EducationFormFields, unknown, z.infer<typeof educationFormSchema>>({
    resolver: zodResolver<EducationFormFields, unknown, z.infer<typeof educationFormSchema>>(educationFormSchema),
    defaultValues: {
      university: application.university ?? "",
      graduationYear: application.graduationYear?.toString() ?? "",
      disciplinesOfStudy: application.disciplinesOfStudy ?? [],
      levelOfStudy: application.levelOfStudy ?? "",
      countryOfResidence: application.countryOfResidence ?? "",
    },
  })

  async function onSubmit(values: z.infer<typeof educationFormSchema>): Promise<void> {
    await updateApplication("education", values)
    await mutateApplication({ ...application, ...values })
    if (application.university == null) router.push("/dashboard/cv")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="university"
            render={({ field: { ref, ...field } }) => (
              <FormItem>
                <FormLabel>Educational Institution</FormLabel>
                <FormControl>
                  <VirtualizedComboBox 
                    options={schoolOptions}
                    prominentOptions={new Set(["Durham University"])}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select educational institution..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="graduationYear"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>Graduation Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="Enter graduation year..."
                    value={isString(value) ? value : ""}
                    {...field}
                  />
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
            render={({ field: { onChange, ref, ...field } }) => (
              <FormItem>
                <FormLabel>Level of Study</FormLabel>
                <FormDescription>
                  Select the level of formal education you are currently working towards.
                </FormDescription>
                <Select onValueChange={onChange} {...field}>
                  <FormControl>
                    <SelectTrigger ref={ref}>
                      <SelectValueViewport>
                        <SelectValue placeholder="Select level of study..." />
                      </SelectValueViewport>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="secondary">Secondary/High School</SelectItem>
                    <SelectItem value="undergraduate-first-year">
                      Undergraduate Degree (1<sup>st</sup> year)
                    </SelectItem>
                    <SelectItem value="undergraduate-second-year">
                      Undergraduate Degree (2<sup>nd</sup> year)
                    </SelectItem>
                    <SelectItem value="undergraduate-third-year-or-higher">
                      Undergraduate Degree (3<sup>rd</sup> year or higher)
                    </SelectItem>
                    <SelectItem value="graduate">Graduate Degree (Master&apos;s, PhD, etc)</SelectItem>
                    <SelectItem value="bootcamp">Code School/Bootcamp</SelectItem>
                    <SelectItem value="vocational-or-apprenticeship">
                      Vocational/Trade Program or Apprenticeship
                    </SelectItem>
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
            name="disciplinesOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discipline(s) of Study</FormLabel>
                <FormControl>
                  <MultiSelect {...field} options={disciplineOfStudyOptions} hidePlaceholderWhenSelected />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="countryOfResidence"
            render={({ field: { ref, ...field } }) => (
              <FormItem>
                <FormLabel>Country of Residence</FormLabel>
                <ComboBox<string>
                  placeholder="Select country..."
                  options={countryOptions}
                  prominentOptions={new Set(["GBR"])}
                  {...field}
                >
                  <ComboBoxTrigger ref={ref}>
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
        <div className="mt-16 flex justify-center">
          <FormSubmitButton type="submit">Save Progress</FormSubmitButton>
        </div>
      </form>
    </Form>
  )
}

function EducationFormSkeleton() {
  return <FormSkeleton rows={4} className="mt-2" />
}

export default function EducationPage() {
  const {
    data: schoolOptions,
    isLoading: schoolOptionsLoading,
    error: schoolOptionsError,
  } = useSWRImmutable<SchoolOption[], unknown>(
    "/application/education/institution-options",
    optionsFetcher<SchoolOption>,
  )
  const {
    data: countryOptions,
    isLoading: countryOptionsLoading,
    error: countryOptionsError,
  } = useSWRImmutable<CountryOption[], unknown>("/application/education/country-options", optionsFetcher<CountryOption>)
  const { application, applicationIsLoading } = useApplicationContext()

  if (
    !isLoaded(application, applicationIsLoading) ||
    !isLoaded(schoolOptions, schoolOptionsLoading, schoolOptionsError) ||
    !isLoaded(countryOptions, countryOptionsLoading, countryOptionsError)
  ) {
    return <EducationFormSkeleton />
  }

  return <EducationForm schoolOptions={schoolOptions} countryOptions={countryOptions} application={application} />
}
