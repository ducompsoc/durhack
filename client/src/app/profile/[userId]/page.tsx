"use client";

import useSWR from "swr";
import { Button } from "@durhack/web-components/ui/button";
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

const flagNames = ["attendance", "mlhCodeOfConduct", "mlhPolicies", "mlhMarketing"] as const;
type FlagName = typeof flagNames[number];

type Flag = {
    name: FlagName;
    userId: string;
}

const profileListing = React.memo(function PeopleList({params}:{
    params: {userId: string}
}) {
    const { toast } = useToast()

    const [profileData, setProfileData] = React.useState<UserProfile | null>(null);
    const [flagData, setFlagData] = React.useState<Flags | null>(null);

    async function toggleAttendance(){
        try{
            const allFlags = await fetch(`${siteConfig.apiUrl}/profile/${params.userId}/flags`);
            var attendanceStatus = false;
            
            if(!allFlags.ok){
                throw("Error")
            }

            attendanceStatus = (await allFlags.json()).includes("attendance");
            
            const response = await fetch(`${siteConfig.apiUrl}/profile/${params.userId}/flags`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userFlags:{
                        "attendance": !attendanceStatus
                    }
                })
            })

            if(!response.ok){
                throw("Error")
            }

            setFlagData({
                ...flagData,
                attendance: !flagData!.attendance
            } as Flags);

            toast({
                description: "Sucecssfully toggled attendance!",
                variant: "success"
            })
        }catch(error){
            toast({
                description: "Something went wrong.",
                variant: "destructive"
            })
            return 
        }
    }

    function processFlags(flagResponse:[]){
        const dummyFlags:Flags = Object.fromEntries(flagNames.map(flagName => [flagName, false])) as Flags;
        
        for (const flag of flagResponse) {
            dummyFlags[flag as FlagName] = true;
        }

        return dummyFlags
    }

    const AttendanceButton=()=>(
        <div className="flex justify-center">
            <Button onClick={toggleAttendance} className="text-center">Toggle attendance</Button>
        </div>
    );

    const fetcher = (url: string) => fetch(url, {
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

    const { data: swrProfileData, error: profError, isLoading: profIsLoading } = useSWR(`${siteConfig.apiUrl}/profile/${params.userId}`, fetcher);
    const { data: swrFlagData, error: flagError, isLoading: flagIsLoading } = useSWR(`${siteConfig.apiUrl}/profile/${params.userId}/flags`, fetcher);

    useEffect(() => {
        if (swrProfileData && swrFlagData) {
            setProfileData(swrProfileData);
            setFlagData(processFlags(swrFlagData));
        }
    }, [swrProfileData, swrFlagData]);

    if(profError || flagError){
        return <div>Failed to load profile data.</div>
    }

    if (profIsLoading || flagIsLoading){
        return <div>Loading profile data...</div>
    }

    return (
        <main className="flex justify-center">
            
            <div className="bg-muted md:w-full lg:w-1/2 my-7">
                <div className="grid space-y-6 my-5">

                    <div className="grid grid-rows-2 grid-flow-col flex justify-center">
                        <p className="lg:text-4xl md:text-2xl break-word"><strong>User #{params.userId}</strong></p>
                        <p><strong>Attendance: </strong>{String(flagData?.attendance).toUpperCase()}</p>
                    </div>

                    <div className="ml-8 justify-center break-all">
                        <p><b>Role: </b>Hacker</p>
                        <p className="mt-3"><b>University:</b> {profileData?.university} </p>
                        <p><b>Graduation year:</b> {profileData?.gradYear} </p>
                        <p><b>Level of study:</b> {profileData?.levelOfStudy} </p>
                        <p className="mt-3"><b>Age:</b> {profileData?.age} </p>
                        <p><b>Country:</b> {profileData?.country} </p>
                        <p className="mt-3">Todo: keycloak attributes</p>
                    </div>

                    <AttendanceButton/>
                </div>
            </div>
            
        </main>
    );
});

export default profileListing;