// Requirements
import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// Components
import InputFloatLabel from "../Main/InputFloatLabel";

// Actions
import { establishContactAction } from "../../actions/chat";

const AddContact = ({ visible, setVisible, id }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { ESTABLISH_CONTACT } = useSelector(state => state.helper);
    const { contacts } = useSelector(state => state.chat);
    const dispatch = useDispatch();

    // Handling contact adding process
    const handleAddContact = (data) => {
        const query = {
            contactEmail: data[id]
        }

        dispatch(establishContactAction(query));
    }

    // Helper function for react-form-hook error retrieval
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error -mt-4">{errors[name].message}</small>
    };
    
    // Automatically closing the dialog on successful contact add
    useEffect(() => {
        setVisible(false);
    }, [contacts]);

    return (
        <Dialog visible={visible} header="Add contact" draggable={false} onHide={() => setVisible(false)}>
            <div className="flex flex-1 flex-column align-items-center justify-content-center pt-4">
                <form onSubmit={handleSubmit(handleAddContact)}>
                    <Controller
                        name={id}
                        control={control}
                        rules={{ required: `E-mail is required!` }}
                        render={({ field }) => (
                            <InputFloatLabel
                                id={id} size="sm"
                                label="E-mail address"
                                className="mt-4"
                                inputRef={field.ref}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />

                    <div className="pt-0">
                        {getFormErrorMessage(id)}
                        {errors.length === 0 && ESTABLISH_CONTACT?.error && <small className="p-error -mt-4">{ESTABLISH_CONTACT.error}</small>}
                    </div>

                    <div className="pt-2">
                        <Button label="Submit" icon="pi pi-check" className="p-button-sm p-button-text" type="submit" />
                    </div>

                </form>
            </div>
        </Dialog>
    )
}

export default AddContact;