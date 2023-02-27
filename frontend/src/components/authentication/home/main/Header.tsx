import React, { useMemo } from "react";
import { Box, Text, Avatar, Group } from "@mantine/core";

// Hooks
import { useAppSelector } from "../../../../common/hooks";

// Types
import { IChatRoomInfo, IContact } from "../../../../common/types";

// Services
import { createInitials } from "../../../../common/services";

export const Header: React.FC = () => {
    const { roomData, contacts }: { roomData: IChatRoomInfo, contacts: Array<IContact> } = useAppSelector(state => state.chat);
    const roomName = roomData.is_group_chat ? roomData.name : contacts.find(c => c.room_id === roomData.id)!.username;

    const initals = useMemo(() => createInitials(roomName), [roomName]);

    return (
        <Box
            p="xs"
            sx={(theme) => ({
                backgroundColor: theme.colors.dark[7],
            })}>
            <Group>
                <Avatar color="blue" radius="xl">{initals}</Avatar>

                <Box sx={{ flex: 1 }}>
                    <Text fw={500}>{roomName}</Text>
                    <Text fz="sm" color="dimmed">{roomData.description}</Text>
                </Box>
            </Group>
        </Box >
    )
}