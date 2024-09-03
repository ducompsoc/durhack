"use client"


import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "@/lib/zod-iso3-extension"

import type { Profile } from "@/lib/useUser";
import { Input } from "@durhack/web-components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from "@durhack/web-components/ui/form";
import {
    ComboBox,
    ComboBoxButton,
    ComboBoxContent,
    ComboBoxTrigger,
} from "@durhack/web-components/ui/combobox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@durhack/web-components/ui/select"
import { Button } from "@durhack/web-components/ui/button";
import useUser from "@/lib/useUser";
import { useRouter } from 'next/navigation';

type EducationFormFields = {
    school: undefined,
    graduationYear: "",
    levelOfStudy: undefined,
    countryOfResidence: undefined,
}

export type schoolOptionsType = {
    label: string
    value: string
}

export type countryOptionsType = {
    label: string
    emoji: string
    value: string
}

const educationFormSchema = z.object({
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
});

export default function EducationPage() {
    const [schoolOptions, setSchoolOptions] = React.useState<schoolOptionsType>([])
    const [countryOptions, setCountryOptions] = React.useState<countryOptionsType>([])

    const router = useRouter()

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

    const form = useForm<EducationFormFields, any, z.infer<typeof educationFormSchema>>({
        resolver: zodResolver(educationFormSchema
        ),
        defaultValues: {
            school: undefined,
            graduationYear: "",
            levelOfStudy: undefined,
            countryOfResidence: undefined,
        }
    });

    async function onSubmit(values: z.infer<typeof educationFormSchema>): Promise<void> {
        console.log(values)
        router.push("/details/auth")
    }

    const { profile } = useUser()
    
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <h2 className="text-2xl">
                    Education & Location Information
                </h2>
                <div className="mb-4">
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
                </div>
                <div className="mb-4">
                    <FormField
                        control={form.control}
                        name="graduationYear"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Graduation Year</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder={profile.graduationYear} {...field} />
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
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Graduation Year</FormLabel>
                            <FormControl>
                                <Input type="number" inputMode="numeric" placeholder={profile.graduationYear} {...field} />
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
                        render={({ field: {onChange, value, ...field} }) => (
                            <FormItem>
                            <FormLabel>Level of Study</FormLabel>
                            <Select onValueChange={onChange} defaultValue={value} >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={profile.levelOfStudy} className="" />
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
                </div>
                <div className="mb-4">
                    <FormField
                        control={form.control}
                        name="countryOfResidence"
                        render={({ field: {onChange, value, ...field} }) => (
                            <FormItem>
                            <FormLabel>Country of Residence</FormLabel>
                            <Select onValueChange={onChange} defaultValue={value} >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={profile.countryOfResidence} className="" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                { countryOptions.map((country) => (
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

                <div className="mt-16">
                    <Button variant="default" className="mx-[45%] py-2 px-4 text-center rounded-sm text-white bg-white bg-opacity-15 hover:bg-green-500 hover:cursor-pointer hover:shadow-[0_0px_50px_0px_rgba(34,197,94,0.8)] transition-all" type="submit">
                        Save Progress
                    </Button>
                </div>
            </form>
        </Form>
    )
}