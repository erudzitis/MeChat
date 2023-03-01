import React, { useMemo } from "react";
import { Box, Text, Avatar, Group, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

// Hooks
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";

// Types
import { IChatRoomInfo, IContact } from "../../../../common/types";

// Services
import { createInitials, typingParticipants } from "../../../../common/services";

// Actions
import { removeContactAction, removeRoomAction } from "../../../../actions/chat";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { roomData, contacts }: { roomData: IChatRoomInfo, contacts: Array<IContact> } = useAppSelector(state => state.chat);

    const roomName = roomData.is_group_chat ? roomData.name : contacts.find(c => c.room_id === roomData.id)?.username;
    const typing = typingParticipants(roomData?.participants, roomData?.typing);
    const initals = useMemo(() => createInitials(roomName), [roomName]);

    const leave = () => {
        dispatch(roomData?.is_group_chat 
            ? removeRoomAction({ roomId: roomData?.id })
            : removeContactAction({ contactId: contacts.find(c => c.room_id === roomData.id)!.id }));
    }

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

                    <Group spacing="xs">
                        <Text fz="sm">{roomData.description}</Text>

                        <AnimatePresence>
                            {typing.length && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <Text fz="sm" color="dimmed">{`(${typing})`}</Text>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Group>
                </Box>

                <Box>
                    <ActionIcon onClick={leave}>
                        <IconTrash size={20} />
                    </ActionIcon>
                </Box>
            </Group>
        </Box >
    )
}