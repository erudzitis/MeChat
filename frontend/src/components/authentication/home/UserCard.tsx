import React from "react";
import { Avatar, Box, Group, UnstyledButton, Text, ActionIcon } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

// Actions
import { logoutAction } from "../../../actions/authentication";

interface IUserCardProps {
    username: string;
    email: string;
    image?: string;
}

export const UserCard: React.FC<IUserCardProps> = (props) => {
    const { username, email, image } = props;

    return (
        <Box
            sx={(theme) => ({
                paddingTop: theme.spacing.sm,
                borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
                    }`,
            })}
        >
            <UnstyledButton
                sx={(theme) => ({
                    display: "block",
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

                    "&:hover": {
                        backgroundColor:
                            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                })}
            >
                <Group>
                    <Avatar
                        radius="xl"
                    />
                    <Box sx={{ flex: 1 }}>
                        <Text size="sm" weight={500}>
                            { username }
                        </Text>
                        <Text color="dimmed" size="xs">
                            { email }
                        </Text>
                    </Box>
                    <Box>
                        <ActionIcon onClick={logoutAction}>
                            <IconLogout size={20} />
                        </ActionIcon>
                    </Box>
                </Group>
            </UnstyledButton>
        </Box>
    )
};