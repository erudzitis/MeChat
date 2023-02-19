import React from "react";
import { Navbar as MantineNavbar, Flex, ScrollArea, Loader, Center, Button } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";

// Components
import { ContactCard } from "./contacts/ContactCard";
import { UserCard } from "./UserCard";
import { Brand } from "./Brand";

// Hooks
import { useGetRooms } from "../../../common/hooks";

export const Navbar: React.FC = () => {
    const { data: roomData, loading: roomsLoading, error: roomsError } = useGetRooms();
    
    return (
        <MantineNavbar p="xs" width={{ base: 300 }}>
            <MantineNavbar.Section>
                <Brand />
            </MantineNavbar.Section>

            <MantineNavbar.Section grow mt="md" component={ScrollArea}>
                <Button 
                    fullWidth 
                    variant="light" 
                    compact
                    rightIcon={<IconUserPlus size={16} />}
                >
                    Add friends
                </Button>
                
                {roomsLoading ?
                    (
                        <Center>
                            <Loader />
                        </Center>
                    ) : (
                        <Flex direction="column" gap="xs">
                            {roomData.map(room => (
                                <ContactCard username={room.name} />
                            ))}
                        </Flex>
                    )}
            </MantineNavbar.Section>

            <MantineNavbar.Section>
                <UserCard username="Ernests" email="ernests@mail.com" />
            </MantineNavbar.Section>
        </MantineNavbar>
    )
};