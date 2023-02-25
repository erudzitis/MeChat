import React, { useLayoutEffect, useRef } from "react";
import { Stack, ScrollArea } from "@mantine/core";

// Components
import { ChatCard } from "./chat/ChatCard";

// Types
import { IChatRoomInfo } from "../../../../common/types";

// Hooks
import { useAppSelector, UseGetUser } from "../../../../common/hooks";

export const Content: React.FC = () => {
    const { roomData }: { roomData: IChatRoomInfo } = useAppSelector(state => state.chat);
    const user = UseGetUser();

    const scrollRef = useRef<HTMLDivElement>(null);

    // Scrolling to the latest message
    useLayoutEffect(() => {
        scrollRef!.current!.scrollIntoView({ behavior: "smooth" });
    });

    return (
        <ScrollArea style={{ height: 610 }} scrollbarSize={6}>
            <Stack spacing="lg" p="md">
                {roomData.messages.map(message => (
                    <ChatCard 
                        key={message.created_at.toString()} 
                        {...message} 
                        isOur={message.username == user?.username}
                    />
                ))}

                <div ref={scrollRef} />
            </Stack>
        </ScrollArea>
    )
}