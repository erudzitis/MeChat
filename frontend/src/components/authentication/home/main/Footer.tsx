import React, { useMemo } from "react";
import { Box, TextInput, ActionIcon, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandTelegram } from "@tabler/icons-react";
import { Text } from "@mantine/core";

// Hooks
import { useAppSelector, useAppDispatch } from "../../../../common/hooks";

// Types
import { ISendMessageFormData, IChatRoomInfo } from "../../../../common/types";

// Actions
import { createMessageAction } from "../../../../actions/chat";

// Websocket
import { ws } from "../../../../common/websocket";

// Services
import { typingParticipants } from "../../../../common/services";

export const Footer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { roomData }: { roomData: IChatRoomInfo } = useAppSelector(state => state.chat);

    const typing = typingParticipants(roomData?.participants, roomData?.typing);

    const form = useForm({
        initialValues: {
            roomId: roomData?.id,
            content: "",
        },
        validate: {
            content: value => (value.length == 0 ? "" : null)
        }
    });

    const handleSubmit = (formData: ISendMessageFormData) => {
        dispatch(createMessageAction(formData));
        ws.sendMessage(formData);
        form.setFieldValue("content", "");
    }

    const onTyping = () => { 
        ws.startTyping(roomData?.id);
        console.log("TYPING LOCAL");
    }

    const onStopTyping = () => { 
        ws.stopTyping(roomData?.id);
        console.log("STOPPED TYPING LOCAL");
    }

    return (
        <Box p="xs">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Text>
                    {typing}
                </Text>
                <Group spacing="sm">
                    <TextInput
                        sx={{ flex: 1 }}
                        placeholder="Type your message here..."
                        size="md"
                        id="content"
                        onFocusCapture={onTyping}
                        onBlurCapture={onStopTyping}
                        {...form.getInputProps("content")}
                    />

                    <ActionIcon radius="xl" variant="filled" size="xl" color="blue" type="submit">
                        <IconBrandTelegram size={20} />
                    </ActionIcon>
                </Group>
            </form>
        </Box>
    )
}