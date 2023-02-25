import { Box, Divider } from "@mantine/core";
import React from "react";

// Components
import { Header } from "./Header";

export const Main: React.FC = () => {
    return (
        <Box h="100%">
            <Header />
            <Divider />
        </Box>
    )
}