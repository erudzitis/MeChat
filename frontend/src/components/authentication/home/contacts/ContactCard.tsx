import React, { useMemo } from "react";
import { Avatar, Card, Flex, Text, Badge } from "@mantine/core";

// Actions
import { retrieveRoomInfoAction, readRoomAction } from "../../../../actions/chat";

// Hooks
import { useAppDispatch } from "../../../../common/hooks";

// Services
import { createInitials } from "../../../../common/services";
import { motion } from "framer-motion";

interface IContactCardProps {
    username: string;
    id: string;
    image?: string;
    latest_msg_date?: Date;
    read_at?: Date;
    online?: boolean;
}

export const ContactCard: React.FC<IContactCardProps> = (props) => {
    const { username, image, id, read_at, latest_msg_date, online } = props;
    const dispatch = useAppDispatch();
    const initals = useMemo(() => createInitials(username), [username]);

    const handleOnClick = () => {
        dispatch(retrieveRoomInfoAction(id));
        dispatch(readRoomAction(id));
    };

    return (
        <Card
            shadow="sm"
            p="sm"
            radius="sm"
            withBorder
            sx={(theme) => ({
                backgroundColor: theme.colors.dark[7],
                "&:hover": {
                    backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
                    cursor: "pointer"
                },
            })}
            onClick={handleOnClick}
        >
            <Flex align="center" gap="sm">
                <Avatar color="blue" radius="xl">{initals}</Avatar>
                <Text fz="md" weight={400}>{username}</Text>

                {latest_msg_date && read_at && new Date(latest_msg_date) > new Date(read_at)
                    && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ marginLeft: "auto" }}
                        ><Badge size="xs" ml="auto">Unread</Badge></motion.div>
                    )
                }

                {online
                    && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ marginLeft: "auto" }}
                        ><Badge size="xs" color="green">Online</Badge></motion.div>
                    )
                }
            </Flex>
        </Card>
    )
};