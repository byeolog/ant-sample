import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon, Empty } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ToastGridBasic from "./grid/toastGrid/ToastGridBasic";
import BigSchedulerBasic from "./calendar/bigScheduler/BigSchedulerBasic";
import DashboardChartAntpro from "./dashboard/chart/AntPro";
import ToastChart from "./dashboard/chart/ToastChart";

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
        component: <BigSchedulerBasic />,
        routerPath: "/calendar/bigscheduler"
      },
      {
        key: "csub1_2",
        title: "subCalendar2",
        parentTitle: "BigScheduler",
        component: "",
        routerPath: "/"
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
        component: "",
        routerPath: "/"
      },
      {
        key: "csub2_2",
        title: "subCalendar2",
        parentTitle: "calendar2",
        component: "",
        routerPath: "/"
      },
      {
        key: "csub2_3",
        title: "subCalendar3",
        parentTitle: "calendar2",
        component: "",
        routerPath: "/"
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
        component: <ToastGridBasic />,
        routerPath: "/grid/toastgrid"
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
        component: "",
        routerPath: "/"
      },
      {
        key: "gsub2_2",
        title: "subGrid2",
        parentTitle: "Grid2",
        component: "",
        routerPath: "/"
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
        title: "ToastChart",
        parentTitle: "Chart",
        component: "",
        routerPath: "/dashboard/chart/toastchart"
      },
      {
        key: "dsub1_2",
        title: "AntPro",
        parentTitle: "Chart",
        component: <DashboardChartAntpro />,
        routerPath: "/dashboard/chart/antpro"
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
        component: "",
        routerPath: "/"
      },
      {
        key: "dsub2_2",
        title: "subDashboard2",
        parentTitle: "Dashboard2",
        component: "",
        routerPath: "/"
      },
      {
        key: "dsub2_3",
        title: "subDashboard3",
        parentTitle: "Dashboard2",
        component: "",
        routerPath: "/"
      }
    ]
  }
];

export class App extends Component {
  state = {
    Breadcrumb1: "Hello",
    Breadcrumb2: "React",
    Breadcrumb3: "Router",

    selectedHeaderMenu: "calendar",
    headerMenu: headerMenu,
    sidebarMenu: sidebarMenu_Calendar,

    content: <BigSchedulerBasic />,

    collapsed: false
  };

  _handlerClickHeader = e => {
    if (e.key === "header1") {
      this.setState({
        selectedHeaderMenu: "calendar",
        sidebarMenu: sidebarMenu_Calendar
        // Breadcrumb1: "calendar",
        // Breadcrumb2: "BigScheduler",
        // Breadcrumb3: "Basic",
        // content: <BigSchedulerBasic />
        // Breadcrumb1: "calendar",
        // Breadcrumb2: "",
        // Breadcrumb3: ""
        // content: <Empty />
      });
    } else if (e.key === "header2") {
      this.setState({
        selectedHeaderMenu: "grid",
        sidebarMenu: sidebarMenu_Grid
        // Breadcrumb1: "grid",
        // Breadcrumb2: "ToastGrid",
        // Breadcrumb3: "Basic",
        // content: <ToastGridBasic />
        // Breadcrumb1: "grid",
        // Breadcrumb2: "",
        // Breadcrumb3: ""
        // content: <Empty />
      });
    } else if (e.key === "header3") {
      this.setState({
        selectedHeaderMenu: "dashboard",
        sidebarMenu: sidebarMenu_Dashboard
        // Breadcrumb1: "dashboard",
        // Breadcrumb2: "Chart",
        // Breadcrumb3: "Basic",
        // content: <DashboardChartBasic />
        // Breadcrumb1: "dashboard",
        // Breadcrumb2: "",
        // Breadcrumb3: ""
        // content: <Empty />
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
              <span>{menu.title}</span>
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
          <span>{item.title}</span>
          <Link to={item.routerPath} />
        </Menu.Item>
      );
    });
    return subMenuItem;
  };

  _handlerClickSubMenuItem = item => {
    this.setState({
      Breadcrumb1: this.state.selectedHeaderMenu,
      Breadcrumb2: item.parentTitle,
      Breadcrumb3: item.title,
      content: item.component ? item.component : <Empty />
    });
  };

  toggleSider = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  _renderTrigger = () => {
    let component;
    if (this.state.collapsed === true) {
      component = (
        <div className="siderTriggerDiv siderTriggerDivRight">
          <Icon type="right" onClick={this.toggleSider} />
        </div>
      );
    } else {
      component = (
        <div className="siderTriggerDiv siderTriggerDivLeft">
          <Icon type="left" onClick={this.toggleSider} />
        </div>
      );
    }

    return component;
  };

  render() {
    return (
      <Router>
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
              <Sider
                width={200}
                style={{ background: "#fff" }}
                collapsible
                collapsed={this.state.collapsed}
                trigger={null}
              >
                {this._renderTrigger()}
                <Menu
                  mode="inline"
                  defaultOpenKeys={["csub1"]}
                  // defaultSelectedKeys={["csub1_1"]}
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
                  {/* {this.state.content} */}
                  <Route exact path="/" component={Empty} />
                  <Route
                    path="/calendar/bigscheduler"
                    component={BigSchedulerBasic}
                  />
                  <Route path="/grid/toastgrid" component={ToastGridBasic} />
                  <Route
                    path="/dashboard/chart/antpro"
                    component={DashboardChartAntpro}
                  />
                  <Route
                    path="/dashboard/chart/toastchart"
                    component={ToastChart}
                  />
                </Content>
              </Layout>
            </Layout>
          </Layout>

          {/* <BigSchedulerBasic /> */}
        </div>
      </Router>
    );
  }
}

export default App;
