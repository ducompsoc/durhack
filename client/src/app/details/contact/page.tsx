"use client"


import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { PhoneInput } from "@durhack/web-components/ui/phone-number-input"
import { Button } from "@durhack/web-components/ui/button";
import "@/lib/zod-phone-extension"
import { useRouter } from 'next/navigation';

type ContactFormFields = {
    phoneNumber: string
    email: string
}

const contactFormSchema = z.object({
    phoneNumber: z.string().phone(),
    email: z.string().email(),
});

export default function ContactPage(profile: Profile) {
    const router = useRouter()
    
    const form = useForm<ContactFormFields, any, z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            phoneNumber: "",
            email: "",
        }
    });

    async function onSubmit(values: z.infer<typeof contactFormSchema>): Promise<void> {
        console.log(values)
        router.push("/details/education")
    }
    
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <h2 className="text-2xl">
                    Contact Information
                </h2>
                <div className="mb-4">
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
                                placeholder={profile.phoneNumber}
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder={profile.email} {...field} />
                            </FormControl>
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