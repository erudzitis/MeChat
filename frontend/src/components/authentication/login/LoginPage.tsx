import { useEffect } from "react";
import { Container, Text, Paper, TextInput, PasswordInput, Group, Checkbox, Anchor, Button, Center, Image } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAppSelector } from "../../../common/hooks";

// Constants
import { MIN_PASSWORD_LEN, MIN_USERNAME_LEN } from "../../../common/contants";

// Types
import { ILoginFormData } from "../../../common/types";

interface LoginPageProps {
    navigateRegister: () => void;
    handleSubmit: (formData: ILoginFormData) => void;
}

/**
 * Component that renders login page
 * @returns React.FC
 */
export const LoginPage: React.FC<LoginPageProps> = (props: LoginPageProps) => {
    const { handleSubmit, navigateRegister } = props;
    const { LOGIN } = useAppSelector(state => state.helper);

    const form = useForm({
        initialValues: {
            username: "",
            password: "",
            rememberMe: true
        },
        validate: {
            username: value => (value.length < MIN_USERNAME_LEN ? `Shorter than ${MIN_USERNAME_LEN} characters` : null),
            password: value => (value.length < MIN_PASSWORD_LEN ? `Shorter than ${MIN_PASSWORD_LEN} characters` : null)
        }
    });

    // Applies form errors received back from the response of the server
    useEffect(() => {
        if (!LOGIN?.error) return;
        form.setErrors({ "username": " ", "email": " ", "password": LOGIN.error });
    }, [LOGIN?.error]);

    return (
        <Center style={{ width: "100%", height: "100%", position: "absolute" }}>
            <Container fluid style={{ position: "relative", width: 400 }}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Center>
                        <Image src="/images/mechat.png" width={200} />
                    </Center>

                    <Text color="dimmed" size="sm" align="center" mt={5}>
                        Do not have an account?{' '}
                        <Anchor<'a'> size="sm" onClick={navigateRegister}>
                            Register
                        </Anchor>
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput
                            label="Username"
                            placeholder="Username"
                            {...form.getInputProps("username")}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Password"
                            mt="sm"
                            {...form.getInputProps("password")}
                        />
                        <Group position="apart" mt="lg">
                            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
                            <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                                Forgot password?
                            </Anchor>
                        </Group>
                        <Button loading={LOGIN?.loading} fullWidth mt="xl" type="submit">
                            Submit
                        </Button>
                    </Paper>
                </form>
            </Container>
        </Center>
    );
};