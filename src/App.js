import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon, Empty } from "antd";

import ToastGridBasic from "./grid/toastGrid/ToastGridBasic";
import BigSchedulerBasic from "./calendar/bigScheduler/BigSchedulerBasic";
import DashboardChartBasic from "./dashboard/chart/Basic";

import "./App.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const headerMenu = [
  { key: "header1", title: "calendar" },
  { key: "header2", title: "grid" },
  { key: "header3", title: "dashboard" }
];

const sidebarMenu_Calendar = [
  {
    title: "BigScheduler",
    key: "csub1",
    subMenu: [
      {
        key: "csub1_1",
        title: "Basic",
        parentTitle: "BigScheduler",
        component: <BigSchedulerBasic />
      },
      {
        key: "csub1_2",
        title: "subCalendar2",
        parentTitle: "BigScheduler",
        component: ""
      }
    ]
  },
  {
    title: "calendar2",
    key: "csub2",
    subMenu: [
      {
        key: "csub2_1",
        title: "subCalendar1",
        parentTitle: "calendar2",
        component: ""
      },
      {
        key: "csub2_2",
        title: "subCalendar2",
        parentTitle: "calendar2",
        component: ""
      },
      {
        key: "csub2_3",
        title: "subCalendar3",
        parentTitle: "calendar2",
        component: ""
      }
    ]
  }
];

const sidebarMenu_Grid = [
  {
    title: "ToastGrid",
    key: "gsub1",
    subMenu: [
      {
        key: "gsub1_1",
        title: "Basic",
        parentTitle: "ToastGrid",
        component: <ToastGridBasic />
      }
    ]
  },
  {
    title: "Grid2",
    key: "gsub2",
    subMenu: [
      {
        key: "gsub2_1",
        title: "subGrid1",
        parentTitle: "Grid2",
        component: ""
      },
      {
        key: "gsub2_2",
        title: "subGrid2",
        parentTitle: "Grid2",
        component: ""
      },
      { key: "gsub2_3", title: "subGrid3", parentTitle: "Grid2", component: "" }
    ]
  }
];

const sidebarMenu_Dashboard = [
  {
    title: "Chart",
    key: "dsub1",
    subMenu: [
      {
        key: "dsub1_1",
        title: "Basic",
        parentTitle: "Chart",
        component: <DashboardChartBasic />
      },
      {
        key: "dsub1_2",
        title: "subDashboard2",
        parentTitle: "Dashboard1",
        component: ""
      }
    ]
  },
  {
    title: "Dashboard2",
    key: "dsub2",
    subMenu: [
      {
        key: "dsub2_1",
        title: "subDashboard1",
        parentTitle: "Dashboard2",
        component: ""
      },
      {
        key: "dsub2_2",
        title: "subDashboard2",
        parentTitle: "Dashboard2",
        component: ""
      },
      {
        key: "dsub2_3",
        title: "subDashboard3",
        parentTitle: "Dashboard2",
        component: ""
      }
    ]
  }
];

export class App extends Component {
  state = {
    Breadcrumb1: "calendar",
    Breadcrumb2: "calendar1",
    Breadcrumb3: "subCalendar1",

    selectedHeaderMenu: "calendar",
    headerMenu: headerMenu,
    sidebarMenu: sidebarMenu_Calendar,

    content: <BigSchedulerBasic />
  };

  _handlerClickHeader = e => {
    if (e.key === "header1") {
      this.setState({
        selectedHeaderMenu: "calendar",
        sidebarMenu: sidebarMenu_Calendar,
        Breadcrumb1: "calendar",
        Breadcrumb2: "BigScheduler",
        Breadcrumb3: "Basic",
        content: <BigSchedulerBasic />
      });
    } else if (e.key === "header2") {
      this.setState({
        selectedHeaderMenu: "grid",
        sidebarMenu: sidebarMenu_Grid,
        Breadcrumb1: "grid",
        Breadcrumb2: "ToastGrid",
        Breadcrumb3: "Basic",
        content: <ToastGridBasic />
      });
    } else if (e.key === "header3") {
      this.setState({
        selectedHeaderMenu: "dashboard",
        sidebarMenu: sidebarMenu_Dashboard,
        Breadcrumb1: "dashboard",
        Breadcrumb2: "Chart",
        Breadcrumb3: "Basic",
        content: <DashboardChartBasic />
      });
    }
  };

  _renderHeaderMenu = () => {
    const menu = this.state.headerMenu.map(menu => {
      return (
        <Menu.Item key={menu.key} onClick={this._handlerClickHeader}>
          {menu.title}
        </Menu.Item>
      );
    });
    return menu;
  };

  _renderSubMenu = () => {
    const subMenu = this.state.sidebarMenu.map(menu => {
      return (
        <SubMenu
          key={menu.key}
          title={
            <span>
              <Icon type="user" />
              {menu.title}
            </span>
          }
        >
          {this._renderSubMenuItem(menu)}
        </SubMenu>
      );
    });
    return subMenu;
  };

  _renderSubMenuItem = menu => {
    const subMenuItem = menu.subMenu.map(item => {
      return (
        <Menu.Item
          key={item.key}
          onClick={() => this._handlerClickSubMenuItem(item)}
        >
          {item.title}
        </Menu.Item>
      );
    });
    return subMenuItem;
  };

  _handlerClickSubMenuItem = item => {
    this.setState({
      Breadcrumb2: item.parentTitle,
      Breadcrumb3: item.title,
      content: item.component ? item.component : <Empty />
    });
  };

  render() {
    return (
      <div>
        <Layout>
          <Header className="header">
            <div className="logo">Metanet</div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["header1"]}
              style={{ lineHeight: "64px" }}
            >
              {this._renderHeaderMenu()}
            </Menu>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                defaultOpenKeys={["csub1"]}
                defaultSelectedKeys={["csub1_1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                {this._renderSubMenu()}
              </Menu>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>{this.state.Breadcrumb1}</Breadcrumb.Item>
                <Breadcrumb.Item>{this.state.Breadcrumb2}</Breadcrumb.Item>
                <Breadcrumb.Item>{this.state.Breadcrumb3}</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 600
                }}
              >
                {this.state.content}
              </Content>
            </Layout>
          </Layout>
        </Layout>

        {/* <BigSchedulerBasic /> */}
      </div>
    );
  }
}

export default App;
