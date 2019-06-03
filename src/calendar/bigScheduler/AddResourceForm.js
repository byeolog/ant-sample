import React, { Component } from "react";
import {
  Form,
  Input,
  Drawer,
  Col,
  Row,
  Divider,
  Tag,
  Table,
  Select,
  DatePicker,
  Button,
  Typography,
  Icon
} from "antd";

import moment from "moment";
import { AST_Await } from "terser";

const { Option } = Select;
const { Title } = Typography;

const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}

export class AddResourceForm extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false
  };

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        this.props.onCreate(
          this.props.form.getFieldValue("group"),
          this.props.form.getFieldValue("name")
        );
      }
    });
  };

  renderTag = () => {
    const resource = this.props.resource;

    const tagParent = resource.filter(data => {
      return data.groupOnly === true;
    });

    const returnTags = [];
    tagParent.map(data => {
      returnTags.push(
        <Title level={4}>
          <Icon type="usergroup-add" /> {data.name}
        </Title>
      );
      resource.map(item => {
        if (data.id === item.parentId) {
          returnTags.push(<Tag closable>{item.name}</Tag>);
        }
      });
    });
    return returnTags;
    // const tags = resource
    //   .filter(data => {
    //     return data.groupOnly === true;
    //   })
    //   .map(item => {
    //     return resource
    //       .filter(data2 => {
    //         return data2.parentId === item.id;
    //       })
    //       .map(item2 => {
    //         return <Tag closable>{item2.name}</Tag>;
    //       });
    //   });

    // return tags;
  };
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
    const { getFieldDecorator } = this.props.form;

    return (
      <Drawer
        title="인력 배정"
        width={720}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          ref={this.props.ref}
          onSubmit={this.handleSubmit}
        >
          <Row gutter={16}>
            <Col span={24}>
              <div>{this.renderTag()}</div>
            </Col>
          </Row>
          <Divider>임직원 조회</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Group">
                {getFieldDecorator("group", {
                  rules: [{ required: true, message: "Please select an owner" }]
                })(
                  <Select placeholder="Please select an owner">
                    <Option value="g0">공공사업팀</Option>
                    <Option value="g1">아키텍쳐팀</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Name">
                {getFieldDecorator("name", {
                  rules: [{ required: true, message: "Please enter user name" }]
                })(<Input placeholder="Please enter user name" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="DateTime">
                {getFieldDecorator("dateTime", {
                  rules: [
                    {
                      required: true,
                      message: "Please choose the dateTime"
                    }
                  ]
                })(
                  <DatePicker.RangePicker
                    style={{ width: "100%" }}
                    getPopupContainer={trigger => trigger.parentNode}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>{/* <Button>검색</Button> */}</Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <div>
                <div style={{ marginBottom: 16 }}>
                  <Button
                    type="primary"
                    onClick={this.start}
                    disabled={!hasSelected}
                    loading={loading}
                  >
                    Reload
                  </Button>
                  <span style={{ marginLeft: 8 }}>
                    {hasSelected
                      ? `Selected ${selectedRowKeys.length} items`
                      : ""}
                  </span>
                </div>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data}
                />
              </div>
            </Col>
          </Row>

          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Form.Item>
              <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>

              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Drawer>
    );
  }
}

export default Form.create()(AddResourceForm);
