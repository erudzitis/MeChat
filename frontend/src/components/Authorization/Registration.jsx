// Requirements
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Steps } from "primereact/steps";

// Components
import Card from "./Card";
import InputFloatLabel from "../Main/InputFloatLabel";
import PasswordFloatLabel from "../Main/PasswordFloatLabel";
import Center from "../Custom/Center";
import FileUploadCustom from "../Main/FileUploadCustom";

// Utils
import { newFormData } from "../../utils";

// Actions
import { registerAction } from "../../actions/auth";

const Registration = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const stepItems = [
        { label: "Account details" },
        { label: "Profile customization" }
    ]

    const onSuccessfulSubmit = ({ image, ...data }) => {
        // If a picture is selected, we convert query to form data
        const query = selectedFile ? newFormData({ ...data, image: selectedFile }) : data;

        dispatch(registerAction(query, navigate));
    }

    return (
        <Center className="surface-card" expand>
            <Steps
                model={stepItems}
                readOnly={false}
                activeIndex={currentStep}
                onSelect={(e) => setCurrentStep(e.index)}
            />

            <Card type="REGISTER" onSuccessfulSubmit={onSuccessfulSubmit}>
                {currentStep === 0 ?
                    <>
                        <InputFloatLabel id="email" label="Email" size="sm" />
                        <InputFloatLabel id="username" label="Username" size="sm" />
                        <PasswordFloatLabel id="password" label="Password" size="sm" />
                    </>
                    :
                    <>
                        <FileUploadCustom id="image" setSelectedFile={setSelectedFile} notRequired={true} />
                        <InputFloatLabel id="description" label="Description" size="sm" notRequired={true} />
                    </>
                }
            </Card>
        </Center>
    )
}

export default Registration;