import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Card, Title } from "@mantine/core";
import useAuth from "../../features/auth/hooks/useAuth";

export function LoginPage() {
  const { login } = useAuth();
  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 2 ? null : "Password too short"),
    },
  });

  return (
    <div style={{ maxWidth: 400, margin: "auto", paddingTop: 100 }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2} ta="center" mb="md">
          Login
        </Title>
        <form
          onSubmit={form.onSubmit((values) =>
            login(values.email, values.password)
          )}
        >
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps("password")}
          />
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}
