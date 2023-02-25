import React from "react";
import { Box, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";

// Hooks
import { useAppDispatch } from "../../../../common/hooks";

// Actions 
import { clearRoomInfoAction } from "../../../../actions/chat";

export const Brand: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const navigateHome = () => {
        navigate("/");
        dispatch(clearRoomInfoAction());
    }

    return (
        <Box sx={(theme) => ({
            paddingBottom: theme.spacing.sm,
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
            "&:hover": {
                cursor: "pointer"
            }
        })}
        onClick={navigateHome}
        >
            <Image
                src="/images/mechat.png"
                height={25}
                fit="contain"
            />
        </Box>
    )
}