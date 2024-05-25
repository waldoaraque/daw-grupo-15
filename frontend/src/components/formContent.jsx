// DynamicForm.js
import React from 'react';
import { Box, Stack, Inline, Text } from '@keystone-ui/core';
import { Button } from '@keystone-ui/button';
import { TextInput, TextArea } from '@keystone-ui/fields';

export default function DynamicFormContent({ formTitle, formSubtitle, fields, onSubmit, buttonText }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        onSubmit(formProps, () => e.target.reset());
    };

    return (
        <Box margin="large" padding="large" borderRadius="medium" backgroundColor="white" boxShadow="small">
            <Stack gap="medium">
                <Text as="h1" size="large">{formTitle}</Text>
                {formSubtitle && <Text as="p" size="medium" color="gray">{formSubtitle}</Text>}
                <form onSubmit={handleSubmit}>
                    {fields.map((field, index) => (
                        <Box key={index} marginBottom="large">
                            {field.label && <Text as="label" htmlFor={field.name} marginBottom="small">{field.label}</Text>}
                            {field.type === 'textarea' ? (
                                <TextArea
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    resize="vertical"
                                    width="full"
                                />
                            ) : (
                                <TextInput
                                    id={field.name}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    width="full"
                                />
                            )}
                        </Box>
                    ))}
                    <Button tone="active" weight="bold" size="medium" type="submit">{buttonText}</Button>
                </form>
            </Stack>
        </Box>
    );
}
