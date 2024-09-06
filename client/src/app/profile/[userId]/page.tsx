"use client";

import useSWR from "swr";
import { Button } from "@durhack/web-components/ui/button";
import { Checkbox } from "@durhack/web-components/ui/checkbox";
import React, { use, useEffect } from "react";
import { useToast } from "@durhack/web-components/ui/use-toast"

import { siteConfig } from "@/config/site";

export type UserProfile = {
    age: number,
    university: string,
    gradYear: string,
    levelOfStudy: string,
    country: string
}

type Flags = {
    [T in FlagName]?: boolean | undefined;
}

const defaultFlags = {
    attendance: false,
    mlhCodeOfConduct: false,
    mlhPolicies: false,
    mlhMarketing: false
};

type FlagName = keyof typeof defaultFlags;

const ProfileListing = React.memo(function PeopleList({params}:{
    params: {userId: string}
}) {
    const { toast } = useToast()

    const fetcher = async (url: string) => fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }else{
            throw new Error('Failed to fetch data');
        }
    });

    const flagsFetcher = async (url: string) => fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    }).then((json:string[]) => {
        const dummyFlags = Object.assign({}, defaultFlags);
        const flagResponse = json;

        for (const flag of flagResponse) {
            dummyFlags[flag as FlagName] = true;
        }
        return dummyFlags
    });

    const { data: swrProfileData, error: profError, isLoading: profIsLoading } = useSWR(`${siteConfig.apiUrl}/profile/${params.userId}`, fetcher);
    const { data: swrFlagData, error: flagError, isLoading: flagIsLoading } = useSWR(`${siteConfig.apiUrl}/profile/${params.userId}/flags`, flagsFetcher);

    if(profError || flagError){
        return <div>Failed to load profile data.</div>
    }

    if (profIsLoading || flagIsLoading){
        return <div>Loading profile data...</div>
    }

    const handleCheckbox = (checked:boolean) => {
        void setAttendance(checked)
    };

    async function setAttendance(setValue:boolean){
        try{
            const response = await fetch(`${siteConfig.apiUrl}/profile/${params.userId}/flags`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userFlags:{
                        "attendance": setValue
                    }
                })
            })
            if(!response.ok){
                throw new Error("Something went wrong.")
            }

            toast({
                description: "Successfully toggled attendance!",
                variant: "success"
            })
        }catch(error){
            toast({
                description: String(error),
                variant: "destructive"
            })
            return 
        }
    }

    return (
        <main className="flex justify-center">
            
            <div className="bg-muted md:w-full lg:w-1/2 my-7">
                <div className="grid space-y-6 my-5">

                    <div className="grid grid-rows-2 grid-flow-col flex justify-center">
                        <p className="lg:text-4xl md:text-2xl break-word"><b>User #{params.userId}</b></p>
                        <div className="flex items-center">
                            <p><b>Attendance:</b></p> 
                            <Checkbox className="ml-2" defaultChecked={swrFlagData?.attendance ? true : false} 
                            onCheckedChange={handleCheckbox}> </Checkbox>
                        </div>
                    </div>

                    <div className="ml-8 justify-center break-all">
                        <p><b>Role: </b>Hacker</p>
                        <p className="mt-3"><b>University:</b> {swrProfileData?.university} </p>
                        <p><b>Graduation year:</b> {swrProfileData?.gradYear} </p>
                        <p><b>Level of study:</b> {swrProfileData?.levelOfStudy} </p>
                        <p className="mt-3"><b>Age:</b> {swrProfileData?.age} </p>
                        <p><b>Country:</b> {swrProfileData?.country} </p>
                        <p className="mt-3">Todo: keyclock attributes</p>
                    </div>
                </div>
            </div>
            
        </main>
    );
});

export default ProfileListing;