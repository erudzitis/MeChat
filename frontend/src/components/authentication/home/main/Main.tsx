import React, { useEffect } from "react";
import { Flex, Divider } from "@mantine/core";
import { motion } from "framer-motion";

// Components
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Content } from "./Content";

// Hooks
import { UseWS } from "../../../../common/hooks";

export const Main: React.FC = () => {
    UseWS();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Flex h="100%" direction="column">
                <Header />
                <Divider />
                <Content />
                <Divider />
                <Footer />
            </Flex>
        </motion.div>
    )
}