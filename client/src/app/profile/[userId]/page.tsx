"use client";

import { Button } from "@durhack/web-components/ui/button";
import React, { use, useEffect } from "react";
import { useToast } from "@durhack/web-components/ui/use-toast"

import { siteConfig } from "@/config/site";

interface IProfileDetails{ //matches registration form fields -ish
    attendance: boolean,

    age: number,
    university: string,
    gradYear: string,
    levelOfStudy: string,
    country: string,

    mlhCodeConduct: boolean,
    mlhPolicies: boolean,
    mlhMarketing: boolean
}

const profileListing = React.memo(function PeopleList({params}:{
    params: {userId: string}
}) {
    const { toast } = useToast()
    const [profileData, setProfileData] = React.useState<IProfileDetails | null>(null);
    const [error, setError] = React.useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${siteConfig.apiUrl}/profile?userId=${params.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }})
                if(response.status == 200){
                    const profData = await response.json()
                    setProfileData(profData)
                }
            }catch(err){
                console.warn(err)
            }
        }
        fetchData();
    },[params.userId]);

    async function toggleAttendance(){
        try{
            const response = await fetch(`${siteConfig.apiUrl}/profile/update-attendance`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId:params.userId})
            })
            if(response.status != 200){
                throw new Error("Something went wrong.")
            }else{
                toast({
                    description: "Sucecssfully toggled attendance!",
                    variant: "success"
                })
                
                setProfileData({
                    ...profileData,
                    attendance: !profileData!.attendance
                } as IProfileDetails);
            }
        }catch(err){
            toast({
                description: String(err),
                variant: "destructive"
              })
        }
    }

    const AttendanceButton=()=>(
        <div className="flex justify-center">
            <Button onClick={toggleAttendance} className="text-center">Toggle attendance</Button>
        </div>
    );

    return (
        <main className="flex justify-center">
            
            <div className="bg-muted md:w-full lg:w-1/2 my-7">
                <div className="grid space-y-6 my-5">

                    <div className="grid grid-rows-2 grid-flow-col flex justify-center">
                        <p className="lg:text-4xl md:text-2xl break-word"><strong>User #{params.userId}</strong></p>
                        <p><strong>Attendance: </strong>{String(profileData?.attendance).toUpperCase()}</p>
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