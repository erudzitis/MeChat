// Requirements
import React, { useState, Children } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Card = ({ children, type, fn }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [rememberMe, setRememberMe] = useState(true);

    const formState = useSelector(state => state.helper[type]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function that proceeds with communication with the api
    const handleAuthorization = (data) => {
        dispatch(fn(data, navigate));
    }

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error -mt-4">{errors[name].message}</small>
    };

    return (
        <div className="flex align-items-center justify-content-center bg-blue-200" style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
            <div className="fadein animation-duration-500 surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src={`${process.env.PUBLIC_URL}/images/primaryIcon.png`} height={50} />
                </div>

                <form onSubmit={handleSubmit(handleAuthorization)}>
                    <div className="flex gap-5 flex-column">
                        {
                            Children.map(children, (child) => {
                                return (
                                    <>
                                        <Controller
                                            name={child.props.id}
                                            control={control}
                                            rules={{ required: `${child.props.label} is required!` }}
                                            render={({ field }) => (
                                                <child.type
                                                    {...child.props}
                                                    invalid={errors[child.props.id]}
                                                    inputRef={field.ref}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                        {getFormErrorMessage(child.props.id)}
                                    </>
                                )
                            })
                        }

                        {formState?.error && <small className="p-error -mt-4">{formState?.error}</small>}
                    </div>

                    <div className="mt-4">
                        <div className="flex align-items-center justify-content-between mb-4">
                            <div className="flex align-items-center">
                                <Checkbox id="rememberme" className="mr-2" onChange={() => setRememberMe(!rememberMe)} checked={rememberMe} />
                                <label htmlFor="rememberme">Remember me</label>
                            </div>

                            <a href={type === "REGISTER" ? "/login" : "/register"} className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
                                {type === "REGISTER" ? "Already registered?" : "Don't have an account?"}
                            </a>
                        </div>

                        <Button label={type === "REGISTER" ? "Register" : "Login"} className="w-full" loading={formState?.loading} type="submit" />
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Card;