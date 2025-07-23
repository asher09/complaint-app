"use client";
import {Input, Button} from "../../components/InputWButton";

export default function AdminSigninPage () {


    const Click = () => {
        console.log("Button clicked");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#171717]">
            <div className="max-w-md w-full border rounded border-[#a9e084] shadow p-6 space-y-4">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                <Input 
                    onChange={(e) => console.log(e.target.value)}
                    placeholder="email" 
                />
                <Input 
                    onChange={(e) => console.log(e.target.value)}
                    placeholder="Password" 
                />
                <Button 
                    buttonText="Sign-In"
                    onButtonClick={Click}
                />
            </div>
           
        </div>
    );
}