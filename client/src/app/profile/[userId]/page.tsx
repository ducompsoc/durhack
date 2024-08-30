"use client";

import { Button } from "@durhack/web-components/ui/button";
import React, { use, useEffect } from "react";
import { useToast } from "@durhack/web-components/ui/use-toast"

import { siteConfig } from "@/config/site";
import useSWR from "swr";

interface IProfileDetails{
    age: number,
    university: string,
    gradYear: string,
    levelOfStudy: string,
    country: string
}

interface IFlagDetails{
    attendance: boolean,
    mlhCodeConduct: boolean,
    mlhPolicies: boolean,
    mlhMarketing: boolean
}

interface IFlag {
    name: string;
    userId: string;
}

const profileListing = React.memo(function PeopleList({params}:{
    params: {userId: string}
}) {
    const { toast } = useToast()

    const [profileData, setProfileData] = React.useState<IProfileDetails | null>(null);
    const [flagData, setFlagData] = React.useState<IFlagDetails | null>(null);

    async function toggleAttendance(){
        const response = await fetch(`${siteConfig.apiUrl}/profile/user-flags`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId:params.userId,
                userFlags:{
                    "attendance": null
                }
            })
        })
        if(response.ok){
            toast({
                description: "Sucecssfully toggled attendance!",
                variant: "success"
            })

            setFlagData({
                ...flagData,
                attendance: !flagData!.attendance
            } as IFlagDetails);
        }else{
            toast({
                description: "Something went wrong.",
                variant: "destructive"
            })
        }
    }

    function processFlags(flagResponse:IFlag[]){ //flags get returned as an array of objects {name, userid}
        const dummyFlags:IFlagDetails = {
            attendance: false,
            mlhCodeConduct: false,
            mlhPolicies: false,
            mlhMarketing: false
        };

        for (const flag of flagResponse){
            if (flag.name in dummyFlags){
                dummyFlags[flag.name as keyof IFlagDetails] = true;
            }
        }
        return dummyFlags;
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

    const { data: swrProfileData, error: profError, isLoading: profIsLoading } = useSWR(`${siteConfig.apiUrl}/profile?userId=${params.userId}`, fetcher);
    const { data: swrFlagData, error: flagError, isLoading: flagIsLoading } = useSWR(`${siteConfig.apiUrl}/profile/user-flags?userId=${params.userId}`, fetcher);

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