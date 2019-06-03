import React, { Component } from "react";

import {
  ChartCard,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress
} from "ant-design-pro/lib/Charts";
import "ant-design-pro/dist/ant-design-pro.css";

import Trend from "ant-design-pro/lib/Trend";
import NumberInfo from "ant-design-pro/lib/NumberInfo";
import { Row, Col, Icon, Tooltip } from "antd";
import numeral from "numeral";
import moment from "moment";

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
      "YYYY-MM-DD"
    ),
    y: Math.floor(Math.random() * 100) + 10
  });
}

export default class Basic extends Component {
  render() {
    return (
      <div>
        <Row>
          <Row gutter={16}>
            <Col span={12}>
              <ChartCard
                title="1번 차트"
                total={numeral(8846).format("0,0")}
                contentHeight={134}
              >
                <NumberInfo
                  subTitle={<span>sub title</span>}
                  total={numeral(12321).format("0,0")}
                  status="up"
                  subTotal={17.1}
                />
                <MiniArea line height={45} data={visitData} />
              </ChartCard>
            </Col>
            <Col span={12} style={{ marginTop: 24 }}>
              <ChartCard
                title="2번 차트"
                action={
                  <Tooltip title="tooltip">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(8846).format("0,0")}
                footer={
                  <Field label="바닥글" value={numeral(1234).format("0,0")} />
                }
                contentHeight={46}
              >
                <MiniBar height={46} data={visitData} />
              </ChartCard>
            </Col>
          </Row>
          <Col span={24} style={{ marginTop: 24 }}>
            <ChartCard
              title="3번 차트"
              action={
                <Tooltip title="툴팁">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="78%"
              footer={
                <div>
                  <span>
                    바닥글1
                    <Trend
                      flag="up"
                      style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}
                    >
                      12%
                    </Trend>
                  </span>
                  <span style={{ marginLeft: 16 }}>
                    바닥글2
                    <Trend
                      flag="down"
                      style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}
                    >
                      11%
                    </Trend>
                  </span>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} />
            </ChartCard>
          </Col>
        </Row>
      </div>
    );
  }
}