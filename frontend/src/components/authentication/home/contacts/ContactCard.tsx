import React from "react";
import { Avatar, Card, Flex, Text } from "@mantine/core";

interface IContactCardProps {
    username: string;
    image?: string;
}

export const ContactCard: React.FC<IContactCardProps> = (props) => {
    const { username, image } = props;
    const initals = username.match(/(\b\S)?/g)?.join("")?.match(/(^\S|\S$)?/g)?.join("").toUpperCase() || username.charAt(0);

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
        >
            <Flex align="center" gap="sm">
                <Avatar color="blue" radius="xl">{initals}</Avatar>
                <Text fz="md" weight={400}>{username}</Text>
            </Flex>
        </Card>
    )
};