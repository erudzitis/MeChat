// Requirements
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpeedDial } from "primereact/speeddial";
import { Sidebar } from "primereact/sidebar";
import { ProgressSpinner } from "primereact/progressspinner";
import { ToggleButton } from "primereact/togglebutton";
import { Button } from "primereact/button";
import jwtDecode from "jwt-decode";

// Components
import SearchInput from "../Main/SearchInput";
import AvatarButton from "../Main/AvatarButton";
import ChatListBox from "./Chat/ChatListBox";
import CreateRoom from "./CreateRoom";
import ChatSection from "./Chat/ChatSection";
import AddContact from "./AddContact";
import Center from "../Custom/Center";
import Stack from "../Custom/Stack";

// Actions
import { retrieveContactsAction, retrieveRoomsAction, retrieveRoomDataAction, clearRoomDataAction } from "../../actions/chat";
import { logoutAction } from "../../actions/auth";

const Home = () => {
    const dispatch = useDispatch();
    const [showCreateRoomDialog, setShowCreateRoomDialog] = useState(false);
    const [showAddContact, setShowAddContact] = useState(false);
    const [searchFeed, setSearchFeed] = useState("");
    const { rooms, contacts, roomData } = useSelector(state => state.chat);
    const { userData } = useSelector(state => state.auth);
    const { RETRIEVE_ROOMS } = useSelector(state => state.helper);

    // Combining contacts and rooms for generic 'feed'
    // Filtering contacts and rooms
    const roomsFiltered = useMemo(() => {
        // Returning empty feed until data has been recieved
        if (rooms === undefined || contacts === undefined) return [];

        // Combining rooms and contacts into feed. Doing some modifications
        const feed = [...rooms, ...contacts?.map(c => {
            return { id: c.room_id, name: c.username, description: "" }
        })]

        // Implementing non case-sensitive search
        const searchFeedLowercase = searchFeed.toLowerCase();

        return searchFeed !== "" ? feed.filter(uf => uf.name.toLowerCase().indexOf(searchFeedLowercase) >= 0) : feed;

    }, [searchFeed, rooms, contacts]);

    // Handling room data retrieval
    const handleRetrieveRoomData = (roomId) => {
        // Clearing any saved room data in state
        dispatch(clearRoomDataAction());
        dispatch(retrieveRoomDataAction({ roomId: roomId }));
    }

    // Handling logout
    const handleLogout = () => {
        dispatch(logoutAction());
    }

    // items for speed dial
    const items = [
        {
            label: "Add Friend",
            icon: "pi pi-user-plus",
            command: () => {
                setShowAddContact(true);
            },
        },
        {
            label: "Create Room",
            icon: "pi pi-comments",
            command: () => {
                setShowCreateRoomDialog(true);
            },
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
                <CreateRoom setSidebarValue={setShowCreateRoomDialog} />
            </Sidebar>

            <AddContact visible={showAddContact} setVisible={setShowAddContact} id="add-contact" />

            <Center className="h-screen overflow-hidden" direction="row" expand>
                {/* Left main wrapper */}
                <Stack className="h-full w-3 surface-ground fadein animation-duration-500" direction="column">
                    {/* Upper section (search bar) */}
                    <div className="flex align-items-center justify-content-center surface-border border-bottom-1 h-5rem gap-2">
                        {/* <SearchInput id="search-user" size="sm" placeholder="Search" value={searchFeed} onChange={(e) => setSearchFeed(e.target.value)} />
                        <ToggleButton onIcon="pi pi-filter-fill" offIcon="pi pi-filter-slash" onLabel="" offLabel="" />
                        <Button icon="pi pi-sign-out" onClick={handleLogout} /> */}
                    </div>
                    {/* Middle section (chat list) */}
                    <Stack className="flex-1 overflow-y-auto p-2" direction="column">
                        {(RETRIEVE_ROOMS?.loading) && <ProgressSpinner style={{ width: "50px", height: "50px", marginTop: "10px" }} strokeWidth="4" />}
                        <Stack spacing={2}>
                            {roomsFiltered && roomsFiltered.map(feedElement => {
                                return (
                                    <ChatListBox
                                        key={`ChatListBox-${feedElement.id}-${feedElement.name}`}
                                        username={feedElement.name}
                                        chatPreview={feedElement.description}
                                        onClick={() => handleRetrieveRoomData(feedElement.id)}
                                        isActive={roomData?.roomId === feedElement.id}
                                    />
                                )
                            })}
                        </Stack>

                    </Stack>
                    {/* Lower section (control bar) */}
                    <div className="flex align-items-center justify-content-between h-5rem">
                        {/* <div className="flex align-items-center justify-content-center h-full w-3">
                            <AvatarButton shape="circle" size="xlarge" />
                        </div>
                        <div>
                            <h3 className="text-white">{userData.username}</h3>
                        </div>
                        <div className="flex flex-1 align-items-center justify-content-end h-full">
                            <SpeedDial className="mr-2" model={items} direction="left" />
                        </div> */}
                    </div>
                </Stack>
                {/* Right main wrapper */}
                <div className="flex flex-1 h-full">
                    <ChatSection />
                </div>
            </Center>
        </>
    )
}

export default Home;