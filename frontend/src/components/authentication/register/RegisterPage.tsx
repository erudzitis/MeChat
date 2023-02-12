import { useEffect } from "react";
import { Container, Title, Text, Paper, TextInput, PasswordInput, Group, Checkbox, Anchor, Button, Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAppSelector } from "../../../common/hooks";

// Constants
import { MIN_PASSWORD_LEN, MIN_USERNAME_LEN } from "../../../common/contants";

// Types
import { IRegisterFormData } from "../../../common/types";

interface IRegisterPageProps {
    navigateLogin: () => void;
    handleSubmit: (formData: IRegisterFormData) => void;
}

/**
 * Component that renders register page
 * @returns React.FC
 */
export const RegisterPage: React.FC<IRegisterPageProps> = (props: IRegisterPageProps) => {
    const { handleSubmit, navigateLogin } = props;
    const { REGISTER } = useAppSelector(state => state.helper);

    const form = useForm({
        initialValues: {
            username: "",
            email: "",
            password: "",
            rememberMe: true
        },
        validate: {
            username: value => (value.length < MIN_USERNAME_LEN ? `Shorter than ${MIN_USERNAME_LEN} characters` : null),
            email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email provided"),
            password: value => (value.length < MIN_PASSWORD_LEN ? `Shorter than ${MIN_PASSWORD_LEN} characters` : null)
        }
    });

    // Applies form errors received back from the response of the server
    useEffect(() => {
        if (!REGISTER?.error) return;
        form.setErrors({ "username": " ", "email": " ", "password": REGISTER.error });
    }, [REGISTER?.error]);

    return (
        <Center style={{ width: "100%", height: "100%", position: "absolute" }}>
            <Container fluid style={{ position: "relative", width: 400 }}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Title
                        align="center"
                        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                    >
                        Chat application
                    </Title>
                    <Text color="dimmed" size="sm" align="center" mt={5}>
                        Already have an account?{' '}
                        <Anchor<'a'> size="sm" onClick={navigateLogin}>
                            Login
                        </Anchor>
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput
                            label="Username"
                            placeholder="Username"
                            id="username"
                            {...form.getInputProps("username")}
                        />
                        <TextInput
                            label="E-mail"
                            placeholder="Email"
                            id="email"
                            mt="sm"
                            {...form.getInputProps("email")}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Password"
                            id="password"
                            mt="sm"
                            {...form.getInputProps("password")}
                        />
                        <Group position="apart" mt="lg">
                            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
                        </Group>
                        <Button loading={REGISTER?.loading} fullWidth mt="xl" type="submit">
                            Submit
                        </Button>
                    </Paper>
                </form>
            </Container>
        </Center>
    );
};