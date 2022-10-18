// Requirements
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import InputFloatLabel from "../../../Main/InputFloatLabel";
import Stack from "../../../Custom/Stack";
import Error from "../../../Custom/Error";

// Actions
import { establishContactAction } from "../../../../actions/chat";

const ContactModal = ({ show, setShow }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ESTABLISH_CONTACT } = useSelector(state => state.helper);
    const { userData } = useSelector(state => state.auth);
    const [inputValue, setInputValue] = useState("");

    const handleCreateContact = () => {
        if (!inputValue) return;

        const query = {
            contactEmail: inputValue
        }

        dispatch(establishContactAction(query, navigate));
    }

    return (
        <Dialog header="Create a new contact" visible={show} draggable={false} onHide={() => setShow(false)}>
            <Stack className="py-2 w-20rem" spacing={3}>
                <InputFloatLabel id="create-contact" label="E-mail address" size="sm" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <Error errors={ESTABLISH_CONTACT?.error} />
                <Button label="Create now!" onClick={handleCreateContact} loading={ESTABLISH_CONTACT?.loading} disabled={!inputValue} />
            </Stack>
        </Dialog>
    )
}

export default ContactModal;