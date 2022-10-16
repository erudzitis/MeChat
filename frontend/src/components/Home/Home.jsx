// Requirements
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import Center from "../Custom/Center";
import Flex from "../Custom/Flex";
import Stack from "../Custom/Stack";
import SearchInput from "../Main/SearchInput";
import ChatListBox from "./Chat/ChatListBox";
import ChatSection from "./Chat/ChatSection";

// Actions
import { logoutAction } from "../../actions/auth";
import { retrieveContactsAction, retrieveRoomsAction } from "../../actions/chat";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchFeed, setSearchFeed] = useState("");
    const { rooms, contacts, roomData } = useSelector(state => state.chat);
    const { RETRIEVE_ROOMS } = useSelector(state => state.helper);

    // Combining contacts and rooms for generic 'feed'
    // Filtering contacts and rooms
    const roomsFiltered = useMemo(() => {
        // Returning empty feed until data has been recieved
        if (!rooms || !contacts) return [];

        // Combining rooms and contacts into feed. Doing some modifications
        const feed = [...rooms, ...contacts?.map(c => {
            return { id: c.room_id, name: c.username, description: "" }
        })]

        // Implementing non case-sensitive search
        const searchFeedLowercase = searchFeed.toLowerCase();

        return searchFeed !== "" ? feed.filter(uf => uf.name.toLowerCase().indexOf(searchFeedLowercase) >= 0) : feed;

    }, [searchFeed, rooms, contacts]);

    const updateURLParams = (roomId) => {
        // Updating query parameters
        navigate({
            search: `?roomId=${roomId}`
        })
    }

    const clearURLParams = () => {
        navigate({
            search: ""
        })
    }


    // Handling logout
    const handleLogout = () => {
        dispatch(logoutAction());
    }

    // fetching data on load
    useEffect(() => {
        dispatch(retrieveContactsAction());
        dispatch(retrieveRoomsAction());
    }, []);

    return (
        <>
            <Center className="h-screen overflow-hidden" direction="row" expand>
                {/* Left main wrapper */}
                <Stack className="h-full w-3 surface-ground fadein animation-duration-500" direction="column">
                    {/* Upper section (search bar) */}
                    <Stack className="p-2 border-bottom-1 surface-border" direction="row" spacing={2}>
                        <Button className="p-button-md" icon="pi pi-home" disabled={!roomData} onClick={clearURLParams} />
                        <SearchInput id="search-contacts-rooms" placeholder="Search rooms" value={searchFeed} onChange={(e) => setSearchFeed(e.target.value)} />
                    </Stack>
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
                                        onClick={() => updateURLParams(feedElement.id)}
                                        isActive={roomData?.roomId === feedElement.id}
                                    />
                                )
                            })}
                        </Stack>

                    </Stack>
                    {/* Lower section (control bar) */}
                    <Flex className="h-5rem p-3">
                        <Button className="p-button-sm w-full" label="Logout" icon="pi pi-sign-out" iconPos="right" onClick={handleLogout} />
                    </Flex>
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