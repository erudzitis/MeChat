import React from "react";
import { Navbar as MantineNavbar, Flex, ScrollArea, Loader, Center, Button, Divider, Box, Group } from "@mantine/core";
import { IconFriends, IconUserPlus, IconAddressBook, IconPlaylistAdd } from "@tabler/icons-react";

// Components
import { ContactCard } from "./contacts/ContactCard";
import { UserCard } from "./UserCard";
import { Brand } from "./Brand";
import { AddFriend } from "./modals/AddFriend";

// Hooks
import { useGetRooms, useModal, useGetContacts } from "../../../common/hooks";

export const Navbar: React.FC = () => {
    const { data: roomData, loading: roomsLoading, error: roomsError } = useGetRooms();
    const { data: contactData, loading: contactsLoading, error: contactsError } = useGetContacts();

    const addFriendsModalState = useModal();

    return (
        <MantineNavbar p="xs" width={{ base: 320 }}>
            <MantineNavbar.Section>
                <Brand />
            </MantineNavbar.Section>

            <MantineNavbar.Section grow mt="md">
                <AddFriend {...addFriendsModalState} />

                <Group spacing="xs" grow>
                    <Button
                        fullWidth
                        variant="light"
                        rightIcon={<IconUserPlus size={16} />}
                        onClick={addFriendsModalState.open}
                    >
                        Add Friends
                    </Button>

                    <Button
                        fullWidth
                        variant="light"
                        rightIcon={<IconPlaylistAdd size={18} />}
                        onClick={addFriendsModalState.open}
                    >
                        Create Group
                    </Button>
                </Group>

                {(roomsLoading || contactsLoading) ?
                    (
                        <Center>
                            <Loader />
                        </Center>
                    ) : (
                        <Box>
                            <Divider my="xs" labelPosition="center" label={
                                <>
                                    <Box mr={5}>My Groups</Box>
                                    <IconFriends size={12} />
                                </>
                            } />

                            <Flex direction="column" gap="xs">
                                {roomData.map(room => (
                                    <ContactCard username={room.name} key={room.id} />
                                ))}
                            </Flex>

                            <Divider my="xs" labelPosition="center" label={
                                <>
                                    <Box mr={5}>My Friends</Box>
                                    <IconAddressBook size={16} />
                                </>
                            } />

                            <ScrollArea style={{ height: 490 }} scrollbarSize={6}>
                                <Flex direction="column" gap="xs">
                                    {contactData.map(contact => (
                                        <ContactCard username={contact.username} key={contact.id} />
                                    ))}
                                </Flex>
                            </ScrollArea>
                        </Box>
                    )}
            </MantineNavbar.Section>

            <MantineNavbar.Section>
                <UserCard username="Ernests" email="ernests@mail.com" />
            </MantineNavbar.Section>
        </MantineNavbar>
    )
};