import React, { useMemo } from "react";
import { Avatar, Card, Flex, Text } from "@mantine/core";

// Actions
import { retrieveRoomInfoAction } from "../../../../actions/chat";

// Hooks
import { useAppDispatch } from "../../../../common/hooks";

// Services
import { createInitials } from "../../../../common/services";

interface IContactCardProps {
    username: string;
    id: string;
    image?: string;
}

export const ContactCard: React.FC<IContactCardProps> = (props) => {
    const { username, image, id } = props;
    const dispatch = useAppDispatch();
    const initals = useMemo(() => createInitials(username), [username]);


    const handleOnClick = () => dispatch(retrieveRoomInfoAction(id));

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
            </Flex>
        </Card>
    )
};