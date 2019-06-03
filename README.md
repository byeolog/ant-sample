# 관련 라이브러리

### React 기반

[Create React App](https://github.com/facebook/create-react-app)<br/>
`npx create-react-app my-app`

react-router-dom<br/>
`yarn add react-router-dom`

### Layout 기반

[Ant Design](https://ant.design/)<br/>
`yarn add antd`

> **최상위 CSS 파일에 추가**<br/>

```css
@import "~antd/dist/antd.css";
```

### Resource Scheduler

[React Big Scheduler](https://stephenchou1017.github.io/scheduler/#/)<br/>
`yarn add react-big-scheduler`

> **SchedulerData.js 의 아래 부분 수정으로 너비 이슈 해소 가능**<br/>

```javascript
    {
        key: 'getSchedulerWidth',
        value: function getSchedulerWidth() {
            var baseWidth = this.documentWidth - this.config.besidesWidth - 300 > 0 ? this.documentWidth - this.config.besidesWidth - 300 : 0;
            return this.isSchedulerResponsive() ? parseInt(baseWidth \* Number(this.config.schedulerWidth.slice(0, -1)) / 100) : this.config.schedulerWidth;
        }
    }
```

> **Drag & Drop을 위해 추가**<br/>
>
> > [react-dnd](http://react-dnd.github.io/react-dnd/about)<br/> `yarn add react-dnd`<br/>
> >
> > react-dnd-html5-backend<br/> `yarn add react-dnd-html5-backend`

### Grid? Table? Cell?...

[Toast UI Grid](https://ui.toast.com/tui-grid) [(github)](https://github.com/nhn/toast-ui.react-grid)<br/>
`yarn add @toast-ui/react-grid`

### Chart

[Toast UI Chart](https://ui.toast.com/tui-chart) [(github)](https://github.com/nhn/toast-ui.react-chart)<br/>
`yarn add @toast-ui/react-chart`

### date library

[Moment](http://momentjs.com/docs/)<br/>
`yarn add moment`

### Github Pages를 사용하기 위해

gh-pages [(create-react-app Docs)](https://facebook.github.io/create-react-app/docs/deployment)<br/>
`yarn add gh-pages`

> **package.json 에 추가**

```json
    ...
    "scripts": {
        ...
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build"
    },
    ...
    "homepage": "https://byeolog.github.io/ant-sample",
    ...
```

`yarn run deploy`

> **BrowserRouter 대신 HashRouter로 변경**
