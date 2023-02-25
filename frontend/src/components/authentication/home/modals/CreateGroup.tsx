import { useEffect, useMemo } from "react";
import { Modal, TextInput, Button, Stack, Box, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";

// Actions
import { addFriendAction, createGroupAction } from "../../../../actions/chat";

// Types
import { IContact, ICreateGroupFormData, IModalHook } from "../../../../common/types";

// Hooks
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";

// Contants
import { MAX_GROUP_SIZE } from "../../../../common/contants";

export const CreateGroup = (props: IModalHook) => {
    const { isOpen, open, close, toggle } = props;
    const { contacts } : { contacts: IContact[] } = useAppSelector(state => state.chat);
    const { CREATE_GROUP } = useAppSelector(state => state.helper);
    const dispatch = useAppDispatch();

    const selectableContacts = useMemo(() => {
        return contacts.map(contact => {
            return { value: contact.id.toString(), label: contact.username };
        })
    }, [contacts]);

    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            groupUsers: []
        },
        validate: {
            name: (value => value.length > 0 ? null : "Group name can't be left blank!")
        }
    });

    const handleSubmit = (formData: ICreateGroupFormData) => dispatch(createGroupAction(formData, () => close())); 

    // Applies form errors received back from the response of the server
    useEffect(() => {
        if (!CREATE_GROUP?.error) return;
        form.setErrors({ "name": "", "description": "", "groupUsers": CREATE_GROUP.error });
    }, [CREATE_GROUP?.error])

    return (
        <Modal
            opened={isOpen}
            onClose={close}
            title="Strength in Numbers, Create a New Group With Your Friends!"
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack spacing="xs">
                    <Box>
                        <TextInput
                            placeholder="Group Name"
                            id="name"
                            mt="sm"
                            {...form.getInputProps("name")}
                        />

                        <TextInput
                            placeholder="Group Description"
                            id="description"
                            mt="sm"
                            {...form.getInputProps("description")}
                        />

                        <MultiSelect 
                            placeholder="Participants" 
                            mt="sm" 
                            searchable
                            nothingFound="Friend not found :("
                            maxSelectedValues={MAX_GROUP_SIZE}
                            data={selectableContacts} 
                            {...form.getInputProps("groupUsers")}
                        />
                    </Box>

                    <Button fullWidth loading={CREATE_GROUP?.loading} type="submit">
                        Create Group
                    </Button>

                </Stack>
            </form>
        </Modal>
    );
};