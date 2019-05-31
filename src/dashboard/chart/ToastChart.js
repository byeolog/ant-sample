import React, { Component } from "react";

import { Row, Col } from "antd";
import "tui-chart/dist/tui-chart.css";
import {
  BarChart,
  LineChart,
  PieChart,
  ColumnChart
} from "@toast-ui/react-chart";

const donutChartDummy = {
  data: {
    categories: ["Browser"],
    series: [
      {
        name: "Chrome",
        data: 46.02
      },
      {
        name: "IE",
        data: 20.47
      },
      {
        name: "Firefox",
        data: 17.71
      },
      {
        name: "Safari",
        data: 5.45
      },
      {
        name: "Opera",
        data: 3.1
      },
      {
        name: "Etc",
        data: 7.25
      }
    ]
  },
  options: {
    chart: {
      //   width: 700,
      //   height: 700,
      title: "Usage share of web browsers",
      format: function(value, chartType, areaType, valuetype, legendName) {
        if (areaType === "makingSeriesLabel") {
          // formatting at series area
          value = value + "%";
        }

        return value;
      }
    },
    series: {
      radiusRange: ["40%", "100%"],
      showLabel: true
    },
    tooltip: {
      suffix: "%"
    },
    legend: {
      align: "bottom"
    }
  }
};

const columnChartDummy = {
  data: {
    categories: [
      "June, 2015",
      "July, 2015",
      "August, 2015",
      "September, 2015",
      "October, 2015",
      "November, 2015",
      "December, 2015"
    ],
    series: [
      {
        name: "Budget",
        data: [5000, 3000, 5000, 7000, 6000, 4000, 1000]
      },
      {
        name: "Income",
        data: [8000, 1000, 7000, 2000, 6000, 3000, 5000]
      },
      {
        name: "Expenses",
        data: [4000, 4000, 6000, 3000, 4000, 5000, 7000]
      },
      {
        name: "Debt",
        data: [6000, 3000, 3000, 1000, 2000, 4000, 3000]
      }
    ]
  },
  options: {
    chart: {
      //   width: 1160,
      //   height: 650,
      title: "Monthly Revenue",
      format: "1,000"
    },
    yAxis: {
      title: "Amount",
      min: 0,
      max: 9000
    },
    xAxis: {
      title: "Month"
    },
    legend: {
      align: "top"
    }
  }
};
const data = {
  categories: ["June", "July", "Aug", "Sep", "Oct", "Nov"],
  series: [
    {
      name: "Budget",
      data: [5000, 3000, 5000, 7000, 6000, 4000]
    },
    {
      name: "Income",
      data: [8000, 1000, 7000, 2000, 5000, 3000]
    }
  ]
};

const options = {
  chart: {
    // width: 650,
    // height: 650,
    title: "Monthly Revenue",
    format: "1,000"
  },
  yAxis: {
    title: "Month"
  },
  xAxis: {
    title: "Amount",
    min: 0,
    max: 9000,
    suffix: "$"
  },
  series: {
    showLabel: true
  }
};

const MyComponent = () => <LineChart data={data} options={options} />;

export default class ToastChart extends Component {
  render() {
    return (
      <>
        <Row gutter={16}>
          <Col span={12}>
            <BarChart ref={this.chartRef} data={data} options={options} />
          </Col>
          <Col span={12}>{MyComponent()}</Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <PieChart
              data={donutChartDummy.data}
              options={donutChartDummy.options}
            />
          </Col>
          <Col span={12}>
            <ColumnChart
              data={columnChartDummy.data}
              options={columnChartDummy.options}
            />
            ;
          </Col>
        </Row>
      </>
    );
  }
}
