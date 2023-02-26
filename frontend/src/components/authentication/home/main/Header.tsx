import React, { useMemo } from "react";
import { Box, Text, Avatar, Group } from "@mantine/core";

// Hooks
import { useAppSelector } from "../../../../common/hooks";

// Types
import { IChatRoomInfo } from "../../../../common/types";

// Services
import { createInitials } from "../../../../common/services";

export const Header: React.FC = () => {
    const { roomData }: { roomData: IChatRoomInfo } = useAppSelector(state => state.chat);
    const initals = useMemo(() => createInitials(roomData?.name), [roomData?.name]);

    return (
        <Box
            p="xs"
            sx={(theme) => ({
                backgroundColor: theme.colors.dark[7],
            })}>
            <Group>
                <Avatar color="blue" radius="xl">{initals}</Avatar>

                <Box sx={{ flex: 1 }}>
                    <Text fw={500}>{roomData.name}</Text>
                    <Text fz="sm" color="dimmed">{roomData.description}</Text>
                </Box>
            </Group>
        </Box >
    )
}