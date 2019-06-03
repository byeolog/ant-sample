import React, { Component } from "react";
import { Form, Select } from "antd";
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
    title: "A프로젝트",
    type: 1
    //bgColor: "#D9D9D9"
  },
  {
    id: 2,
    start: "2019-05-19 12:30:00",
    end: "2019-12-20 23:30:00",
    resourceId: "r2",
    title: "A프로젝트",
    type: 1
    //resizable: false
  },
  {
    id: 3,
    start: "2019-05-22 09:00:00",
    end: "2019-12-26 18:00:00",
    resourceId: "r3",
    title: "A프로젝트",
    type: 2
    //movable: false
  },
  {
    id: 4,
    start: "2019-05-19 14:30:00",
    end: "2019-12-20 23:30:00",
    resourceId: "r1",
    title: "A프로젝트",
    type: 3
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
  handleCreate = (group, name) => {
    this.addResource(group, name);

    this.setState({ visibleDrawer: false });
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

  addResource = (resourceGroup, resourceName) => {
    let schedulerData = this.state.viewModel;
    let newFreshId = schedulerData.resources.length + 1;
    let newFreshName = resourceName;
    schedulerData.addResource({
      id: newFreshId,
      name: newFreshName,
      parentId: resourceGroup
    });
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

  eventItemTemplateResolver = (
    schedulerData,
    event,
    bgColor,
    isStart,
    isEnd,
    mustAddCssClass,
    mustBeHeight,
    agendaMaxEventWidth
  ) => {
    let borderWidth = isStart ? "4" : "0";
    let borderColor = "rgba(0,139,236,1)",
      backgroundColor = "#80C5F6";
    let titleText = schedulerData.behaviors.getEventTextFunc(
      schedulerData,
      event
    );
    if (!!event.type) {
      borderColor =
        event.type === 1
          ? "rgba(0,139,236,1)"
          : event.type === 3
          ? "rgba(245,60,43,1)"
          : "#999";
      backgroundColor =
        event.type === 1 ? "#80C5F6" : event.type === 3 ? "#FA9E95" : "#D9D9D9";
    }
    let divStyle = {
      borderLeft: borderWidth + "px solid " + borderColor,
      backgroundColor: backgroundColor,
      height: mustBeHeight
    };
    if (!!agendaMaxEventWidth)
      divStyle = { ...divStyle, maxWidth: agendaMaxEventWidth };

    return (
      <div key={event.id} className={mustAddCssClass} style={divStyle}>
        <span style={{ marginLeft: "4px", lineHeight: `${mustBeHeight}px` }}>
          {titleText}
        </span>
      </div>
    );
  };

  render() {
    //const { schedulerData } = this.props;
    const { viewModel } = this.state;

    let leftCustomHeader = (
      <div>
        <span style={{ fontWeight: "bold" }}>
          <span onClick={this.showDrawer} className="spanButton">
            배정
          </span>
        </span>
        <AddResourceForm
          visible={this.state.visibleDrawer}
          onClose={this.onCloseDrawer}
          ref={this.saveFormRef}
          onCreate={this.handleCreate}
          resource={this.state.viewModel.resources}
        />
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
        eventItemTemplateResolver={this.eventItemTemplateResolver}
      />
    );
  }
}

export default Form.create()(withDragDropContext(BigScheduler));
// export default withDragDropContext(BigScheduler);
