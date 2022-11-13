// Requirements
import React, { useRef, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

// Components
import Center from "../../../Custom/Center";
import Flex from "../../../Custom/Flex";

const RoomCallCard = React.forwardRef((props, ref) => {
    return (
        <Flex className="w-20rem h-20rem border-2 border-blue-500" direction="column">
            <video autoPlay ref={ref} />
        </Flex>
    )
});

const RoomCallModal = ({ name, show, setShow }) => {
    const localStreamRef = useRef(null);

    // On component mount, get local media stream
    useEffect(() => {
        // Room call modal is visible, we attempt to retrieve local media stream
        if (show) {
            getLocalMediaStream();
        }

        // Modal is closed, we stop media stream
        if (!show && localStreamRef.current) {
            stopStreamTracks(localStreamRef.current.srcObject);
        }

        // Un unmount stop media stream
        return () => {
            if (localStreamRef.current) {
                stopStreamTracks(localStreamRef.current.srcObject);
            }
        }
    }, [show]);

    // Function that fetches media stream from user if permitted
    const getLocalMediaStream = () => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then((stream) => localStreamRef.current.srcObject = stream)
            .catch((error) => console.error(error))
    }

    // Function that streams all media tracks
    const stopStreamTracks = (stream) => {
        stream.getTracks().forEach(track => {
            if (track.readyState == "live") {
                track.stop();
            }
        });
    }

    return (
        <Dialog header={`Calling ${name}`} visible={show} closeOnEscape={false} draggable={false} onHide={() => setShow(false)} maximized>
            <Center className="border-2 border-red-500 h-full gap-5">
                <RoomCallCard ref={localStreamRef} />
                <Button icon="pi pi-minus" className="p-button-rounded p-button-danger" />
            </Center>
        </Dialog>
    )
}

export default RoomCallModal;