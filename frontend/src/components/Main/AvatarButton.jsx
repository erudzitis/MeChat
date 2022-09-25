// Requirements
import React from "react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

const AvatarButton = ({ children, image, shape, size }) => {
    return (
        <Button className="p-button-rounded p-button-text p-0">
            <Avatar className="p-overlay-badge" image={image} shape={shape} size={size} >
                {children}
            </Avatar>
        </Button>
    )
}

export default AvatarButton;