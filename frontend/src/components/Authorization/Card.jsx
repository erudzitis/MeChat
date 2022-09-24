// Requirements
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

const Card = ({ children, type }) => {
    const [rememberMe, setRememberMe] = useState(true);

    return (
        <div className="flex align-items-center justify-content-center bg-blue-200" style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
            <div className="fadein animation-duration-500 surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src={`${process.env.PUBLIC_URL}/images/primaryIcon.png`} height={50} />
                </div>

                <div className="flex gap-5 flex-column">
                    {children}
                </div>

                <div className="mt-4">
                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" className="mr-2" onChange={() => setRememberMe(!rememberMe)} checked={rememberMe} />
                            <label htmlFor="rememberme">Remember me</label>
                        </div>

                        <a href={type === "Registration" ? "/login" : "/register"} className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
                            {type === "Registration" ? "Already registered?" : "Don't have an account?"}
                        </a>
                    </div>

                    <Button label={type === "Registration" ? "Register" : "Login"} className="w-full" />
                </div>
            </div>
        </div>

    )
}

export default Card;