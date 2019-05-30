import React, { Component, Fragment } from "react";

import BigSchedulerBasic from "./calendar/bigScheduler/BigSchedulerBasic";

export default class TestGridWidth extends Component {
  render() {
    const leftDiv = {
      float: "left",
      width: "100px",
      boder: "1px solid black",
      background: "orange"
    };
    const rightDiv = {
      float: "left",
      width: "600px"
    };
    return (
      <Fragment>
        <div style={leftDiv}>블라블라</div>
        <div style={rightDiv}>
          <BigSchedulerBasic />
        </div>
      </Fragment>
    );
  }
}
