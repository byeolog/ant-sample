## 관련 라이브러리

**React 기반**

[Create React App](https://github.com/facebook/create-react-app)
`npx create-react-app my-app`

react-router-dom
`yarn add react-router-dom`

**Layout 기반**

[Ant Design](https://ant.design/)
`yarn add antd`

최상위 CSS 파일에 추가
@import "~antd/dist/antd.css";

**Resource Scheduler**

[React Big Scheduler](https://stephenchou1017.github.io/scheduler/#/)
`yarn add react-big-scheduler`

SchedulerData.js 의 아래 부분 수정으로 너비 이슈 해소 가능
{
key: 'getSchedulerWidth',
value: function getSchedulerWidth() {
var baseWidth = this.documentWidth - this.config.besidesWidth - `300` > 0 ? this.documentWidth - this.config.besidesWidth - `300` : 0;
return this.isSchedulerResponsive() ? parseInt(baseWidth \* Number(this.config.schedulerWidth.slice(0, -1)) / 100) : this.config.schedulerWidth;
}
}

Drag & Drop을 위해 추가
[react-dnd](http://react-dnd.github.io/react-dnd/about)
yarn add react-dnd
react-dnd-html5-backend
yarn add react-dnd-html5-backend

**Grid? Table? Cell?...**

[Toast UI Grid](https://ui.toast.com/tui-grid) [github](https://github.com/nhn/toast-ui.react-grid)
`yarn add @toast-ui/react-grid`

**Chart**

[Toast UI Chart](https://ui.toast.com/tui-chart) [github](https://github.com/nhn/toast-ui.react-chart)
`yarn add @toast-ui/react-chart`

**date library**

[Moment](http://momentjs.com/docs/)
`yarn add moment`
