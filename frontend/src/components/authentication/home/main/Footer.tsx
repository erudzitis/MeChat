import React from "react";
import { Box, TextInput, ActionIcon, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandTelegram } from "@tabler/icons-react";

// Hooks
import { useAppSelector, useAppDispatch } from "../../../../common/hooks";

// Types
import { ISendMessageFormData, IChatRoomInfo } from "../../../../common/types";

// Actions
import { createMessageAction } from "../../../../actions/chat";

// Websocket
import { ws } from "../../../../common/websocket";

export const Footer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { roomData }: { roomData: IChatRoomInfo } = useAppSelector(state => state.chat);

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


    return (
        <Box p="xs">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Group spacing="sm">
                    <TextInput
                        sx={{ flex: 1 }}
                        placeholder="Type your message here..."
                        size="md"
                        id="content"
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