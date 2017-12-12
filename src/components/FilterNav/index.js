import React, { Component } from 'react';
import { Form, Input, Button, Radio } from 'antd';

const FormItem = Form.Item;

const FilterNavForm = Form.create()(
    (props) => {
        const { form, handleCreate } = props;
        const { getFieldDecorator } = form;
        return (
            <Form layout='inline'>
                <FormItem
                    label="Book"
                >
                {getFieldDecorator('book')(
                    <Input placeholder="Book..." />
                )}
                </FormItem>
                <FormItem
                    label="Chapter"
                >
                {getFieldDecorator('chapter')(
                    <Input placeholder="Chapter..." />
                )}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={handleCreate}>Submit</Button>
                </FormItem>
            </Form>
        )
    }
)

class FilterNav extends Component {
    
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            
            console.log('Received values of form: ', values);
            fetch(`http://linking-novum-api.herokuapp.com/api/verses/${values.book}/${values.chapter}`, {
                method: 'GET',
                headers: {
                   'content-type': 'application/json'
            }})
                .then(resp => resp.json())
                .then(verses => {
                    this.props.setVerses(verses, values.book, values.chapter);
            })
            form.resetFields();
        });
    }
      
    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
    return (
        <FilterNavForm
            ref={this.saveFormRef}
            handleCreate={this.handleCreate}
        />
    );
    }
}

export default FilterNav;