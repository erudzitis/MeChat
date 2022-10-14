// Requirements
import React, { useState, Children } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import Error from "../Custom/Error";
import Stack from "../Custom/Stack";
import Center from "../Custom/Center";
import Link from "../Custom/Link";

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

    return (
        <Center className="surface-card" expand>
            <div className="fadein animation-duration-500">
                <div className="text-center mb-5">
                    <img src={`${process.env.PUBLIC_URL}/images/primaryIcon.png`} alt="chat-application" height={50} />
                </div>

                <form onSubmit={handleSubmit(handleAuthorization)}>
                    <Stack spacing={5}>
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

                                        <Error errors={errors} target={child.props.id} />
                                    </>
                                )
                            })
                        }

                        <Error errors={formState?.error} />
                    </Stack>

                    <div className="mt-4">
                        <div className="flex align-items-center justify-content-between mb-4">
                            <div className="flex align-items-center">
                                <Checkbox id="rememberme" className="mr-2" onChange={() => setRememberMe(!rememberMe)} checked={rememberMe} />
                                <label htmlFor="rememberme">Remember me</label>
                            </div>

                            <Link href={type === "REGISTER" ? "/login" : "/register"} label={type === "REGISTER" ? "Already registered?" : "Don't have an account?"} />
                        </div>

                        <Button label={type === "REGISTER" ? "Register" : "Login"} className="w-full" loading={formState?.loading} type="submit" />
                    </div>
                </form>
            </div>
        </Center>

    )
}

export default Card;