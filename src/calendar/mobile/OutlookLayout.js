import React, { Component } from "react";
import { Row, Col, Divider, Icon, DatePicker, Button } from "antd";
import moment from "moment";

const { MonthPicker } = DatePicker;

const day = [
  1,
  2,
  3,
  ,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31
];

export default class OutlookLayout extends Component {
  state = {
    openDatePicker: false
  };
  _renderDay = () => {
    const days = day.map(item => {
      return <div className="dayDiv">{item}</div>;
    });
    return days;
  };
  _renderDay2 = () => {
    const days = day.map(item => {
      return (
        <div>
          <div>1. {item}</div>
          <Divider />
        </div>
      );
    });
    return days;
  };

  toggleDatePicker = () => {
    this.setState(prevState => ({
      openDatePicker: !prevState.openDatePicker
    }));
  };
  hideDatePicker = () => {
    this.setState({
      openDatePicker: false
    });
  };

  datePickerStatus = status => {
    if (!status) {
      this.hideDatePicker();
    }
  };

  render() {
    return (
      <div>
        <div>
          <MonthPicker
            open={this.state.openDatePicker}
            onOpenChange={this.datePickerStatus}
            defaultValue={moment("2019-01", "YYYY-MM")}
            style={{ display: "none" }}
          />
          <Button
            type="primary"
            style={{ marginLeft: "100px" }}
            onClick={this.toggleDatePicker}
          >
            <Icon type="calendar" theme="outlined" />
          </Button>
        </div>
        <div className="dayWrapperDiv">{this._renderDay()}</div>
        <div className="day2WrapperDiv">{this._renderDay2()}</div>
      </div>
    );
  }
}
