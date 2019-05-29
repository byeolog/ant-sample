import React, { Component } from "react";
import "./App.css";

import { Layout, Menu, Breadcrumb, Icon } from "antd";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const headerMenu = [
  { key: "header1", title: "calendar" },
  { key: "header2", title: "grid" },
  { key: "header3", title: "dashboard" }
];

const sidebarMenu_Calendar = [
  {
    title: "calendar1",
    key: "sub1",
    subMenu: [
      { key: "sub1_1", title: "subCalendar1" },
      { key: "sub1_2", title: "subCalendar2" }
    ]
  },
  {
    title: "calendar2",
    key: "sub2",
    subMenu: [
      { key: "sub2_1", title: "subCalendar1" },
      { key: "sub2_2", title: "subCalendar2" },
      { key: "sub2_3", title: "subCalendar3" }
    ]
  }
];

const sidebarMenu_Grid = [
  {
    title: "Grid1",
    key: "sub1",
    subMenu: [
      { key: "sub1_1", title: "subGrid1" },
      { key: "sub1_2", title: "subGrid2" }
    ]
  },
  {
    title: "Grid2",
    key: "sub2",
    subMenu: [
      { key: "sub2_1", title: "subGrid1" },
      { key: "sub2_2", title: "subGrid2" },
      { key: "sub2_3", title: "subGrid3" }
    ]
  }
];

const sidebarMenu_Dashboard = [
  {
    title: "Dashboard1",
    key: "sub1",
    subMenu: [
      { key: "sub1_1", title: "subDashboard1" },
      { key: "sub1_2", title: "subDashboard2" }
    ]
  },
  {
    title: "Dashboard2",
    key: "sub2",
    subMenu: [
      { key: "sub2_1", title: "subDashboard1" },
      { key: "sub2_2", title: "subDashboard2" },
      { key: "sub2_3", title: "subDashboard3" }
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
    sidebarMenu: sidebarMenu_Calendar
  };

  _handlerClickHeader = e => {
    if (e.key === "header1") {
      this.setState({
        selectedHeaderMenu: "calendar",
        sidebarMenu: sidebarMenu_Calendar
      });
    } else if (e.key === "header2") {
      this.setState({
        selectedHeaderMenu: "grid",
        sidebarMenu: sidebarMenu_Grid
      });
    } else if (e.key === "header3") {
      this.setState({
        selectedHeaderMenu: "dashboard",
        sidebarMenu: sidebarMenu_Dashboard
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
      return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
    });
    return subMenuItem;
  };

  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
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
              defaultOpenKeys={["sub1"]}
              defaultSelectedKeys={["sub1_1"]}
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
                minHeight: 780
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
