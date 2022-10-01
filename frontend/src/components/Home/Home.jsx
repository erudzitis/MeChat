// Requirements
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SpeedDial } from "primereact/speeddial";
import { Sidebar } from "primereact/sidebar";
import { ProgressSpinner } from 'primereact/progressspinner';

// Components
import SearchInput from "../Main/SearchInput";
import AvatarButton from "../Main/AvatarButton";
import ChatListBox from "../Main/ChatListBox";
import CreateRoom from "./CreateRoom";

// Actions
import { retrieveContactsAction, retrieveRoomsAction } from "../../actions/chat";

const Home = () => {
    const dispatch = useDispatch();
    const [showCreateRoomDialog, setShowCreateRoomDialog] = useState(false);
    const [searchFeed, setSearchFeed] = useState("");
    const { contacts, rooms } = useSelector(state => state.chat);
    const { RETRIEVE_CONTACTS, RETRIEVE_ROOMS } = useSelector(state => state.helper);

    // Combining contacts and rooms for generic 'feed'
    // Filtering contacts and rooms
    const contactsAndRoomsFiltered = useMemo(() => {
        if (contacts && rooms) {
            // Mapping over contacts to convert them to different template 
            const contactsTransformed = contacts.map(contact => {
                return { id: contact.id, name: contact.username, description: "" };
            });

            const userFeed = [ ...contactsTransformed, ...rooms ];

            // Filtering results based on search
            if (searchFeed) {
                return userFeed.filter(uf => uf.name.indexOf(searchFeed) >= 0);
            }

            return userFeed;
        }

        return [];
    }, [RETRIEVE_CONTACTS, RETRIEVE_ROOMS, searchFeed])

    // items for speed dial
    const items = [
        {
            label: "Add Friend",
            icon: "pi pi-user-plus",
            command: () => {
                setShowCreateRoomDialog(true);
            }
        }
    ];

    // fetching data on load
    useEffect(() => {
        dispatch(retrieveContactsAction());
        dispatch(retrieveRoomsAction());
    }, []);

    return (
        <>
            <Sidebar visible={showCreateRoomDialog} className="bg-blue-700" style={{ width: "25%" }} position="left" onHide={() => setShowCreateRoomDialog(false)}>
                <CreateRoom />
            </Sidebar>

            <div className="flex flex-row align-items-center justify-content-center bg-blue-600 overflow-hidden" style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
                {/* Left main wrapper */}
                <div className="flex flex-column h-full w-3 bg-blue-700 fadein animation-duration-500">
                    {/* Upper section (search bar) */}
                    <div className="flex align-items-center justify-content-center border-blue-600 border-bottom-2 h-5rem">
                        <SearchInput id="search-user" size="sm" placeholder="Search" value={searchFeed} onChange={(e) => setSearchFeed(e.target.value)} />
                    </div>
                    {/* Middle section (chat list) */}
                    <div className="flex flex-1 flex-column border-blue-600 border-bottom-2 overflow-y-auto">
                        {(RETRIEVE_CONTACTS?.loading || RETRIEVE_ROOMS?.loading) && <ProgressSpinner style={{ width: "50px", height: "50px", marginTop: "10px" }} strokeWidth="4" />}
                        {contactsAndRoomsFiltered && contactsAndRoomsFiltered.map(feedElement => {
                            return (
                                <ChatListBox key={`ChatListBox-${feedElement.id}`} username={feedElement.name} chatPreview={feedElement.description} borderBottom />
                            )
                        })}

                    </div>
                    {/* Lower section (control bar) */}
                    <div className="flex align-items-center justify-content-between h-5rem">
                        <div className="flex align-items-center justify-content-center h-full w-3">
                            <AvatarButton image={`${process.env.PUBLIC_URL}/images/defaultAvatar.png`} shape="circle" size="xlarge" />
                        </div>
                        <div className="flex flex-1 align-items-center justify-content-end h-full">
                            <SpeedDial className="mr-2" model={items} direction="left" />
                        </div>
                    </div>
                </div>
                {/* Right main wrapper */}
                <div className="flex flex-1 h-full">

                </div>
            </div>
        </>
    )
}

export default Home;