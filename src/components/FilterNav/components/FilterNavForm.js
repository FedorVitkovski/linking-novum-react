// External Imports
import React from 'react';
import { Form, Input, Button } from 'antd';

// Internal Imports
import { HiddenSubmitButton } from '../styled';

const FormItem = Form.Item;

const FilterNavForm = Form.create()(
    props => {
        const { form, handleSearchChapter } = props;
        const { getFieldDecorator } = form;

        return (
            <Form layout='inline' onSubmit={handleSearchChapter}>
                <FormItem label="Book">
                    {getFieldDecorator('book', {
                        rules: [{ required: true, message: 'Please select a book!' }]
                    })(
                        <Input placeholder="Book..." />
                    )}
                </FormItem>
                <FormItem label="Chapter">
                    {getFieldDecorator('chapter', {
                        rules: [{ required: true, message: 'Please select a chapter!' }]
                    })(
                        <Input placeholder="Chapter..." />
                    )}
                </FormItem>
                <FormItem>
                    <HiddenSubmitButton htmlType="submit" />
                </FormItem>
            </Form>
        )
    }
)

export default FilterNavForm;