import React from "react";
import { AppShell } from "@mantine/core";
import { Navbar } from "./Navbar";

export const Home: React.FC = () => {
    return (
        <AppShell
            padding="md"
            navbar={<Navbar />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            {/* Your application here */}
        </AppShell>
    )
};