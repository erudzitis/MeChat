import React from "react";
import { Navbar as MantineNavbar, Image, Flex, Box, ScrollArea } from "@mantine/core";

// Components
import { ContactCard } from "./contacts/ContactCard";
import { UserCard } from "./UserCard";
import { Brand } from "./Brand";

export const Navbar: React.FC = () => {
    return (
        <MantineNavbar p="xs" width={{ base: 300 }}>
            <MantineNavbar.Section>
                <Brand />
            </MantineNavbar.Section>

            <MantineNavbar.Section grow mt="md" component={ScrollArea}>
                <Flex direction="column" gap="xs">
                    <ContactCard username="Arnis" />
                    <ContactCard username="Ernests R" />
                    <ContactCard username="Zibenzelis Igors" />
                    <ContactCard username="Ingemars Kalnins" />
                    <ContactCard username="Zutis" />
                    <ContactCard username="Bandits" />
                    <ContactCard username="Juris V" />
                    <ContactCard username="Vitvars" />
                    <ContactCard username="Arnis K O" />
                    <ContactCard username="Anna" />
                    <ContactCard username="Janis" />
                </Flex>
            </MantineNavbar.Section>

            <MantineNavbar.Section>
                <UserCard username="Ernests" email="ernests@mail.com" />
            </MantineNavbar.Section>
        </MantineNavbar>
    )
};