import React, { Component } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Icon,
  Modal,
  Divider,
  Tag,
  Table
} from "antd";
import AddResourceForm from "./AddResourceForm";

//1. import
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT
} from "react-big-scheduler";

//include `react-big-scheduler/lib/css/style.css` for styles, link it in html or import it here
import "react-big-scheduler/lib/css/style.css";
import "react-big-scheduler/lib/css/antd-globals-hiding-hack.css";

import moment from "moment";

import withDragDropContext from "./withDnDContext";

const { Option } = Select;

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

//2. create the view model, put it in the props obj
let schedulerData = new SchedulerData(
  new moment().format(DATE_FORMAT),
  ViewTypes.Week
);
//set locale moment to the schedulerData, if your locale isn't English. By default, Scheduler comes with English(en, United States).
//moment.locale("ko-kr");
schedulerData.setLocaleMoment(moment);
//set resources here or later
let resources = [
  {
    id: "g0",
    name: "공공사업팀",
    groupOnly: true
  },
  {
    id: "r1",
    name: "이순신 부장",
    parentId: "g0"
  },
  {
    id: "r2",
    name: "세종 대리",
    parentId: "g0"
  },
  {
    id: "r3",
    name: "강감찬 사원",
    parentId: "g0"
  },
  {
    id: "g1",
    name: "아키텍쳐팀",
    groupOnly: true
  },
  {
    id: "r4",
    name: "구구단 과장",
    parentId: "g1"
  }
];
schedulerData.setResources(resources);
//set events here or later,
//the event array should be sorted in ascending order by event.start property, otherwise there will be some rendering errors
let events = [
  {
    id: 1,
    start: "2019-04-18 09:00:00",
    end: "2019-05-21 18:00:00",
    resourceId: "r3",
    title: "A프로젝트"
    //bgColor: "#D9D9D9"
  },
  {
    id: 2,
    start: "2019-05-19 12:30:00",
    end: "2019-12-20 23:30:00",
    resourceId: "r2",
    title: "A프로젝트"
    //resizable: false
  },
  {
    id: 3,
    start: "2019-05-22 09:00:00",
    end: "2019-12-26 18:00:00",
    resourceId: "r3",
    title: "A프로젝트"
    //movable: false
  },
  {
    id: 4,
    start: "2019-05-19 14:30:00",
    end: "2019-12-20 23:30:00",
    resourceId: "r1",
    title: "A프로젝트"
    //startResizable: false
  },
  {
    id: 5,
    start: "2019-05-22",
    end: "2019-05-23",
    resourceId: "r4",
    title: "A프로젝트",
    //rrule: "FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR",
    bgColor: "#f759ab"
  },
  {
    id: 6,
    start: "2019-05-23",
    end: "2019-05-24",
    resourceId: "r4",
    title: "A프로젝트",
    //rrule: "FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR",
    bgColor: "#f759ab"
  }
];
schedulerData.setEvents(events);

export class BigScheduler extends Component {
  state = {
    viewModel: schedulerData,
    modalVisible: false,
    visibleDrawer: false,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false
  };

  showDrawer = () => {
    this.setState({
      visibleDrawer: true
    });
  };

  onCloseDrawer = () => {
    this.setState({
      visibleDrawer: false
    });
  };

  // showModal = () => {
  //   this.setState({ modalVisible: true });
  // };
  // handleCancel = () => {
  //   this.setState({ modalVisible: false });
  // };
  handleCreate = () => {
    const form = this.form;
    console.log(form);

    // form.validateFields((err, values) => {
    //   if (err) {
    //     return;
    //   }
    //   this.addResource(values.name);
    this.addResource(
      form.props.children[2].props.children[1].props.children.props.children
        .props.value
    );

    this.setState({ visibleDrawer: false });
    // });
  };
  saveFormRef = form => {
    this.form = form;
  };

  prevClick = schedulerData => {
    schedulerData.prev();
    console.log(schedulerData);
    schedulerData.setEvents(events);
    this.setState({
      viewModel: schedulerData
    });
  };

  nextClick = schedulerData => {
    schedulerData.next();
    schedulerData.setEvents(events);
    this.setState({
      viewModel: schedulerData
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(events);
    this.setState({
      viewModel: schedulerData
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(events);
    this.setState({
      viewModel: schedulerData
    });
  };

  eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (
      window.confirm(
        `Do you want to move the event? {eventId: ${event.id}, eventTitle: ${
          event.title
        }, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`
      )
    ) {
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      this.setState({
        viewModel: schedulerData
      });
    }
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    if (
      window.confirm(
        `Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`
      )
    ) {
      let newFreshId = 0;
      schedulerData.events.forEach(item => {
        if (item.id >= newFreshId) newFreshId = item.id + 1;
      });

      let newEvent = {
        id: newFreshId,
        title: "New event you just created",
        start: start,
        end: end,
        resourceId: slotId,
        bgColor: "purple"
      };
      schedulerData.addEvent(newEvent);
      this.setState({
        viewModel: schedulerData
      });
    }
  };

  toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({
      viewModel: schedulerData
    });
  };

  updateEventStart = (schedulerData, event, newStart) => {
    if (
      window.confirm(
        `Do you want to adjust the start of the event? {eventId: ${
          event.id
        }, eventTitle: ${event.title}, newStart: ${newStart}}`
      )
    ) {
      schedulerData.updateEventStart(event, newStart);
    }
    this.setState({
      viewModel: schedulerData
    });
  };

  updateEventEnd = (schedulerData, event, newEnd) => {
    if (
      window.confirm(
        `Do you want to adjust the end of the event? {eventId: ${
          event.id
        }, eventTitle: ${event.title}, newEnd: ${newEnd}}`
      )
    ) {
      schedulerData.updateEventEnd(event, newEnd);
    }
    this.setState({
      viewModel: schedulerData
    });
  };

  addResource = resourceName => {
    let schedulerData = this.state.viewModel;
    let newFreshId = schedulerData.resources.length + 1;
    let newFreshName = resourceName;
    schedulerData.addResource({ id: newFreshId, name: newFreshName });
    this.setState({
      viewModel: schedulerData
    });
  };

  ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${
        event.title
      }}`
    );
  };

  ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${
        event.title
      }}`
    );
  };

  onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.next();
      schedulerData.setEvents(events);
      this.setState({
        viewModel: schedulerData
      });

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  };

  onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev();
      schedulerData.setEvents(events);
      this.setState({
        viewModel: schedulerData
      });

      schedulerContent.scrollLeft = 10;
    }
  };

  onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollTop");
  };

  onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollBottom");
  };

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    //const { schedulerData } = this.props;
    const { getFieldDecorator } = this.props.form;

    const { viewModel } = this.state;

    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

    let leftCustomHeader = (
      <div>
        <span style={{ fontWeight: "bold" }}>
          <span onClick={this.showDrawer} className="spanButton">
            배정
          </span>
        </span>
        {/* <AddResourceForm
          ref={this.saveFormRef}
          visible={this.state.modalVisible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          addResource={this.addResource}
        /> */}
        <Drawer
          title="인력 배정"
          width={720}
          onClose={this.onCloseDrawer}
          visible={this.state.visibleDrawer}
        >
          <Form layout="vertical" hideRequiredMark ref={this.saveFormRef}>
            <Row gutter={16}>
              <Col span={24}>
                <div>
                  <Tag closable>조성현 과장</Tag>
                  <Tag closable>황아름 차장</Tag>
                  <Tag closable>김지혜 대리</Tag>
                  <Tag closable>박영수 차장</Tag>
                </div>
              </Col>
            </Row>
            <Divider>임직원 조회</Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Owner">
                  {getFieldDecorator("owner", {
                    rules: [
                      { required: true, message: "Please select an owner" }
                    ]
                  })(
                    <Select placeholder="Please select an owner">
                      <Option value="xiao">Xiaoxiao Fu</Option>
                      <Option value="mao">Maomao Zhou</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Name">
                  {getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "Please enter user name" }
                    ]
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
          </Form>
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
            <Button onClick={this.onCloseAccount} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.handleCreate} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );

    return (
      <Scheduler
        schedulerData={viewModel}
        prevClick={this.prevClick}
        nextClick={this.nextClick}
        onSelectDate={this.onSelectDate}
        onViewChange={this.onViewChange}
        eventItemClick={this.eventClicked}
        moveEvent={this.moveEvent}
        newEvent={this.newEvent}
        toggleExpandFunc={this.toggleExpandFunc}
        updateEventStart={this.updateEventStart}
        updateEventEnd={this.updateEventEnd}
        leftCustomHeader={leftCustomHeader}
        viewEventText="승인"
        viewEvent2Text="반려"
        viewEventClick={this.ops1}
        viewEvent2Click={this.ops2}
        onScrollLeft={this.onScrollLeft}
        onScrollRight={this.onScrollRight}
        onScrollTop={this.onScrollTop}
        onScrollBottom={this.onScrollBottom}
      />
    );
  }
}

export default Form.create()(withDragDropContext(BigScheduler));
// export default withDragDropContext(BigScheduler);
