import React from "react";
import { motion } from "framer-motion";
import { Text, Paper, Group } from "@mantine/core";

// Types
import { IChatRoomMessage } from "../../../../../common/types";

interface IChatCardProps extends IChatRoomMessage {
    isOur: boolean; /* States whether we are the author of the message */
}

export const ChatCard: React.FC<IChatCardProps> = (props) => {
    const { username, content, created_at, isOur } = props;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Paper
                shadow="xs"
                p="xs"
                radius="md"
                maw="50%"
                display="inline-block"
                style={{ float: isOur ? "right" : "left" }}
                sx={(theme) => ({
                    backgroundColor: !isOur ? theme.colors.dark[7] : theme.colors.blue[9]
                })}
            >
                <Group align="center" spacing="xs">
                    <Text fz="sm" fw={500} mt={-1}>{username}</Text>
                    <Text fz="xs" color={isOur ? undefined : "dimmed"}>{new Date(created_at).toLocaleString()}</Text>
                </Group>

                <Text fz="sm">
                    {content}
                </Text>
            </Paper>
        </motion.div>
    )
}