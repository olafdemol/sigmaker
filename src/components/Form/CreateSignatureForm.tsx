"use client";

import { Box, Button, Group, Paper, Space, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { z } from "zod";
import { IconCheck } from "@tabler/icons-react";

const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    function: z.string().min(1, { message: "Function is required" }),
});

export type SignatureFormValues = z.infer<typeof schema>;

export const CreateSignatureForm = () => {
    const [formValues, setFormValues] = useState<SignatureFormValues>({
        name: "",
        function: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof SignatureFormValues, string>>>({});
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem("signatureForm");
        if (savedData) {
            const parsedData: SignatureFormValues = JSON.parse(savedData);
            setFormValues(parsedData);
        }
    }, []);

    const handleChange = (field: keyof SignatureFormValues, value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
        saveToLocalStorage(field, value);
    };

    const saveToLocalStorage = (field: keyof SignatureFormValues, value: string) => {
        const currentData = localStorage.getItem("signatureForm");
        const parsedData = currentData ? JSON.parse(currentData) : {};
        const updatedData = { ...parsedData, [field]: value };
        localStorage.setItem("signatureForm", JSON.stringify(updatedData));
    };

    const validateForm = () => {
        const result = schema.safeParse(formValues);
        if (!result.success) {
            const validationErrors: Partial<Record<keyof SignatureFormValues, string>> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) {
                    validationErrors[err.path[0] as keyof SignatureFormValues] = err.message;
                }
            });
            setErrors(validationErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            localStorage.setItem("signatureForm", JSON.stringify(formValues));
            setIsSaved(true);
        }
    };

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
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <Space h="sm" />
                <TextInput
                    label="Functie"
                    value={formValues.function}
                    error={errors.function}
                    onChange={(e) => handleChange("function", e.target.value)}
                />
                <Space h="md" />

                <Group>
                    <Button onClick={handleSubmit}>
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
