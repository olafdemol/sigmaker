"use client";

import { Box, Button, Group, Paper, Space, Text, TextInput } from "@mantine/core";
import { z } from "zod";
import { IconCheck } from "@tabler/icons-react";

export const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    function: z.string().min(1, { message: "Function is required" }),
    subtitle: z.string().optional(),
});

export type SignatureFormValues = z.infer<typeof schema>;

interface CreateSignatureFormProps {
    formValues: SignatureFormValues;
    errors: Partial<Record<keyof SignatureFormValues, string>>;
    isSaved: boolean;
    onChange: (field: keyof SignatureFormValues, value: string) => void;
    onSubmit: () => void;
}

export const CreateSignatureForm = ({
    formValues,
    errors,
    isSaved,
    onChange,
    onSubmit,
}: CreateSignatureFormProps) => {
    return (
        <Paper withBorder shadow="md" p="md" w="400px">
            <Box<"form">>
                <Text<"h2"> component="h2" fw="bold" fz="lg">
                    Handtekening maken
                </Text>
                <TextInput
                    label="Naam"
                    value={formValues.name}
                    error={errors.name}
                    onChange={(e) => onChange("name", e.target.value)}
                />
                <Space h="sm" />
                <TextInput
                    label="Functie"
                    value={formValues.function}
                    error={errors.function}
                    onChange={(e) => onChange("function", e.target.value)}
                />
                <Space h="sm" />
                <TextInput
                    label="Ondertitel"
                    value={formValues.subtitle}
                    error={errors.subtitle}
                    onChange={(e) => onChange("subtitle", e.target.value)}
                />
                <Space h="md" />

                <Group>
                    <Button onClick={onSubmit}>
                        Onthouden
                    </Button>
                    {isSaved && (
                        <IconCheck size={25} style={{ marginLeft: 8 }} />
                    )}
                </Group>
            </Box>
        </Paper>
    );
};
