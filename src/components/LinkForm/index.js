import React from 'react';
import { Button, Modal, Form, Input, Radio, Col, DatePicker, InputNumber, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const styles = {
    formItem: {
        marginTop: '3em'
    }
}

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new Link"
        okText="Create a Link"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
            <FormItem label="Where does the original section end?">
                <Col span={5}>
                    <FormItem label='Chapter'>
                        {getFieldDecorator('endChapterNameFrom')(
                            <InputNumber 
                                min={0}
                            />
                        )}
                    </FormItem>
                </Col>
                <Col span={5}>
                    <FormItem label='Verse'>
                        {getFieldDecorator('endVerseFrom')(
                            <InputNumber 
                                min={0}
                            />
                        )}
                    </FormItem>
                </Col>
            </FormItem>
            <FormItem style={styles.formItem} label="Which book contains the section you want to link to?">
                {getFieldDecorator('bookTo')(
                    <Select style={{ width: 120 }}>
                        <Option value='luk'>Luk</Option>
                        <Option value='mat'>Mat</Option>
                        <Option value='mar'>Mar</Option>
                        <Option value='act'>Act</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem label="Where does the link section start?">
                <Col span={5}>
                    <FormItem label='Chapter'>
                        {getFieldDecorator('startChapterNameTo')(
                            <InputNumber
                                min={0}
                            />
                        )}
                    </FormItem>
                </Col>
                <Col span={5}>
                    <FormItem label='Verse'>
                        {getFieldDecorator('startVerseTo')(
                            <InputNumber
                                min={0}
                            />
                        )}
                    </FormItem>
                </Col>
            </FormItem>
            <FormItem style={styles.formItem} label="Where does the link section end?">
                <Col span={5}>
                    <FormItem label='Chapter'>
                        {getFieldDecorator('endChapterNameTo')(
                            <InputNumber
                                min={0}
                            />
                        )}
                    </FormItem>
                </Col>
                <Col span={5}>
                    <FormItem label='Verse'>
                        {getFieldDecorator('endVerseTo')(
                            <InputNumber
                                min={0}
                            />
                        )}
                    </FormItem>
                </Col>
            </FormItem>
            <FormItem style={styles.formItem} label="Add your comment!">
                {getFieldDecorator('description')(
                    <Input
                        type='textarea'
                    />
                )}
            </FormItem>
        </Form>
      </Modal>
    );
  }
);

class CollectionsPage extends React.Component {

  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      values["bookFrom"] = this.props.currVerse.book;
      values["startChapterNameFrom"] = this.props.currVerse.chapter;
      values["startVerseFrom"] = this.props.currVerse.verse;
    
      console.log('Received values of form: ', values);
      fetch('https://linking-novum-api.herokuapp.com/api/links', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
      }).then(resp => console.log(resp))
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  
  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Create a Link</Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CollectionsPage;