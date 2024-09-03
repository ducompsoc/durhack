"use client"

import * as React from "react";
import { BackgroundContext } from "@/app/details/layout";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "@/lib/zod-phone-extension"

import type { Profile } from "@/lib/useUser";
import { Checkbox } from "@durhack/web-components/ui/checkbox";
import Link from "next/link";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@durhack/web-components/ui/form";
import { Button } from "@durhack/web-components/ui/button";
import useUser from "@/lib/useUser";
import { useRouter } from 'next/navigation';

type SubmitFormFields = {
    mlhCodeOfConductAcceptance: boolean | 'indeterminate'
    mlhPoliciesAcceptance: boolean | 'indeterminate'
    mlhMarketingAcceptance: boolean | 'indeterminate'
}

const submitFormSchema = z.object({
    mlhCodeOfConductAcceptance: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
    mlhPoliciesAcceptance: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
    mlhMarketingAcceptance: z.boolean(),
});

export default function SubmitPage() {
    const { setIsFinalSubmitHovering } = React.useContext(BackgroundContext)

    const router = useRouter()

    const form = useForm<SubmitFormFields, any, z.infer<typeof submitFormSchema>>({
        resolver: zodResolver(submitFormSchema),
        defaultValues: {
            mlhCodeOfConductAcceptance: false,
            mlhPoliciesAcceptance: false,
            mlhMarketingAcceptance: false,
        }
    });

    async function onSubmit(values: z.infer<typeof submitFormSchema>): Promise<void> {
        console.log(values)
        router.push("/details")
        setIsFinalSubmitHovering(false)
    }

    const profile = useUser()
    
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <h2 className="text-2xl">
                    Submit Application
                </h2>
                <div className="mb-4">
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
                
                </div>
                <div className="mb-4">
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
                </div>
                <div className="mb-4">
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
                </div>

                <div className="mt-16">
                    <Button 
                        variant="default" 
                        className="mx-[45%] py-2 px-4 text-center rounded-sm text-white bg-white bg-opacity-15 hover:bg-green-500 hover:cursor-pointer hover:shadow-[0_0px_50px_0px_rgba(34,197,94,0.8)] transition-all" 
                        type="submit"
                        onMouseEnter={() => setIsFinalSubmitHovering(true)}
                        onMouseLeave={() => setIsFinalSubmitHovering(false)}>
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    )
}