import React, { Component } from 'react'
import { Switch, withRouter, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/es/locale/zh_CN'
import en_US from 'antd/es/locale/en_US'
import ja_JP from 'antd/es/locale/ja_JP'

import moment from 'moment'
import 'moment/locale/zh-cn'

import { inject, observer } from 'mobx-react'

import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import ja from 'react-intl/locale-data/ja';


import RouteWithSubRoutes from '@/utils/routeWithSubRoutes'
import MainApp from './main'
import Loadable from 'react-loadable'
import DelayLoading from '../components/DelayLoading'

// i18n 配置文件
import zhCN from '../locales/zh-CN'
import enUS from '../locales/en-US'
import jaJP from '../locales/ja-JP'

moment.locale('zh-cn')
addLocaleData([...en, ...zh, ...ja]);

const LoginScreen = Loadable({ loader: () => import('../container/Login'), loading: DelayLoading, delay: 500 })
const NotFound = Loadable({ loader: () => import('../container/Exception/404'), loading: DelayLoading, delay: 500 })
const ServiceError = Loadable({ loader: () => import('../container/Exception/500'), loading: DelayLoading, delay: 500 })
const ServiceTimeOut = Loadable({ loader: () => import('../container/Exception/504'), loading: DelayLoading, delay: 500 })


@withRouter
@inject('Gobal')
@inject('Setting')
@observer
class App extends Component {

  showCurrLocale(locale) {
    switch (locale) {
      case 'zh':
        return zhCN
      case 'en':
        return enUS
      case 'ja':
        return jaJP
      default:
        return zhCN
    }
  }

  showAntdCurrLocale(locale) {
    switch (locale) {
      case 'zh':
        return zh_CN
      case 'en':
        return en_US
      case 'ja':
        return ja_JP
      default:
        return zh_CN
    }
  }
  renderRoute() {
    const { currLocale } = this.props.Setting
    let result = []
    if (this.props.Gobal.userInfo) {
      result.push(
        <IntlProvider locale={currLocale} messages={this.showCurrLocale(currLocale)}>
          <ConfigProvider locale={this.showAntdCurrLocale(currLocale)}>
            <Switch>
              <Route path="/exception/404" component={NotFound} exact />
              <Route path="/exception/500" component={ServiceError} exact />
              <Route path="/exception/504" component={ServiceTimeOut} exact />
              <RouteWithSubRoutes path="/" component={MainApp} exact={false} />
            </Switch>
          </ConfigProvider>
        </IntlProvider>
      )
    } else {
      result.push(
        <IntlProvider locale={currLocale} messages={this.showCurrLocale(currLocale)}>
          <ConfigProvider locale={this.showAntdCurrLocale(currLocale)}>
            <Switch >
              <Route exact path="/login" component={LoginScreen} />
              <Redirect exact={true} from="/*" to="/login" />
            </Switch>
          </ConfigProvider>
        </IntlProvider>
      )
    }
    return result
  }
  render() {
    return this.renderRoute()
  }
}

export default hot(module)(App)
