import { useEffect } from "react";
import { Modal, TextInput, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";

// Actions
import { addFriendAction } from "../../../../actions/chat";

// Types
import { IAddFriendFormData, IModalHook } from "../../../../common/types";

// Hooks
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";

export const AddFriend = (props: IModalHook) => {
    const { isOpen, open, close, toggle } = props;
    const { ADD_FRIEND } = useAppSelector(state => state.helper);
    const dispatch = useAppDispatch();

    const form = useForm({
        initialValues: {
            contactEmail: "",
        },
        validate: {
            contactEmail: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email provided!")
        }
    });

    const handleSubmit = (formData: IAddFriendFormData) => dispatch(addFriendAction(formData, () => close())); 

    // Applies form errors received back from the response of the server
    useEffect(() => {
        if (!ADD_FRIEND?.error) return;
        form.setErrors({ "contactEmail": ADD_FRIEND.error });
    }, [ADD_FRIEND?.error])

    return (
        <Modal
            opened={isOpen}
            onClose={close}
            title="Add New Friends and Build Lasting Connections!"
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack spacing="xs">

                    <TextInput 
                        placeholder="example@mail.com" 
                        id="contactEmail"
                        mt="sm"
                        {...form.getInputProps("contactEmail")} 
                    />

                    <Button fullWidth loading={ADD_FRIEND?.loading} type="submit">
                        Add Friend
                    </Button>

                </Stack>
            </form>
        </Modal>
    );
};