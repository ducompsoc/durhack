"use client";

import { Button } from "@durhack/web-components/ui/button";
import React, { use, useEffect } from "react";
import { useToast } from "@durhack/web-components/ui/use-toast"
// import styled from "styled-components";

interface IProfileDetails{ //matches registration form fields, minus mlh info
    firstNames: string,
    lastNames: string,
    age: string,
    phoneNumber: string,
    email: string,
    school: string,
    graduationYear: string,
    levelOfStudy: string,
    countryOfResidence: string
}

const profileListing = React.memo(function PeopleList({params}:{ //   TODO: create prisma user object, routing for request, check if admin is even required atp
    params: {userId: string}
}) {
    const { toast } = useToast()
    const [error, setError] = React.useState<string>();

    // const [profileDetails, setProfileDetails] = React.useState<IProfileDetails | null>(null);

    // const AdminInfo=()=>( // Extra content for the full info drop admins get
    //     <section>
    //         <p><b>Email:</b> {profileDetails.email}</p>
    //         <p><b>Phone:</b> {profileDetails.phone_number}</p>
    //         <p className="mt-3"><b>University:</b> {profileDetails.university}</p>
    //         <p><b>Graduation year:</b> {profileDetails.graduation_year}</p>
    //         <p className="mt-3"><b>Ethnicity:</b> {profileDetails.ethnicity}</p>
    //         <p><b>Gender:</b> {profileDetails.gender}</p>
    //         <p><b>Age:</b> {profileDetails.age}</p>
    //     </section>
    // );

    const AdminInfo=()=>( // Extra content for the full info drop admins get
        <section>
            <p><b>Email:</b> mail</p>
            <p><b>Phone:</b> phnumber</p>
            <p className="mt-3"><b>University:</b> uni</p>
            <p><b>Graduation year:</b> gyear</p>
            <p className="mt-3"><b>Ethnicity:</b> eth</p>
            <p><b>Gender:</b> gen</p>
            <p><b>Age:</b> age</p>
        </section>
    );

    function toggleAttendance(){
        toast({
            description: "Successfully updated attendance!",
            variant: "success"
          })
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
                        <p><strong>Attendance: </strong>False</p>
                        {/* <p className="lg:text-4xl md:text-2xl break-word"><strong>{profileDetails.preferred_name}</strong></p>
                        <p><strong>Attendance:</strong> {profileDetails.checked_in ? 'True' : 'False'}</p>  */}
                    </div>

                    <div className="ml-8 justify-center break-all">
                        <p><b>Role: </b>Hacker</p>
                        <AdminInfo/>
                        {/* <p><b>Role:</b> {profileDetails.role}</p>
                        {hackathon.role === "admin" && <AdminInfo/>} */}
                    </div>

                    <AttendanceButton/>
                </div>
            </div>
            
        </main>
    );
});

export default profileListing;