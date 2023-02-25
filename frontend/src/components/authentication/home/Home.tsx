import React from "react";
import { AppShell, Center } from "@mantine/core";
import { Navbar } from "./navbar/Navbar";
import { Main } from "./main/Main";
import Lottie from "lottie-react";
import chatBotAnimation from "./main/noChatRoomSelectedAnim.json";

// Hooks
import { useAppSelector } from "../../../common/hooks";

export const Home: React.FC = () => {
    const { roomData } = useAppSelector(state => state.chat);

    return (
        <AppShell
            padding={0}
            navbar={<Navbar />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            {roomData ? 
                (
                    <Main />
                ) : (
                    <Center h="100%">
                        <Lottie animationData={chatBotAnimation} loop={true} />
                    </Center>
                )}
        </AppShell>
    )
};