"use client"


import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

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
import { updateApplication } from "@/lib/updateApplication";
import { useApplicationContext } from "@/hooks/use-application-context";

type ContactFormFields = {
    phone: string
    email: string
}

const contactFormSchema = z.object({
    phone: z.string().phone(),
});

export default function ContactPage() {
    const router = useRouter()
    const { application, applicationIsLoading } = useApplicationContext()

    React.useEffect(() => {
        if (applicationIsLoading || !application) return
        form.reset({
            phone: application.phone ?? "",
            email: application.email ?? "",
        })
    }, [applicationIsLoading, application])

    const form = useForm<ContactFormFields, any, z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            phone: "",
            email: "",
        }
    });

    async function onSubmit(values: z.infer<typeof contactFormSchema>): Promise<void> {
        await updateApplication("contact", values)
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
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <PhoneInput
                                countrySelectProps={{ prominentCountries: new Set(["GB"]) }}
                                defaultCountry="GB"
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
                        disabled={true}
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mt-16 flex justify-center">
                    <Button variant="default" className="py-2 px-4 text-center rounded-sm text-white bg-white bg-opacity-15 hover:bg-green-500 hover:cursor-pointer hover:shadow-[0_0px_50px_0px_rgba(34,197,94,0.8)] transition-all" type="submit">
                        Save Progress
                    </Button>
                </div>
            </form>
        </Form>
    )
}