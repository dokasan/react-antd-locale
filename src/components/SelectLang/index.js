import React, { Component } from 'react';
// import { formatMessage, FormattedMessage, setLocale, getLocale } from 'umi/locale';
import { Menu, Icon, Dropdown } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl'
import { inject, observer } from 'mobx-react'
import classNames from 'classnames';
import styles from './index.less';

@injectIntl
@inject('Setting')
@observer
class SelectLang extends Component {
  changLang = ({ key }) => {
    this.props.Setting.changeCurrLocale(key)
  };

  render() {
    const { className, intl } = this.props;
    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[intl.locale]} onClick={this.changLang}>
        <Menu.Item key="zh">
          <FormattedMessage id="lang.simplified-chinese" />
        </Menu.Item>
        <Menu.Item key="en">
          <FormattedMessage id="lang.english" />
        </Menu.Item>
        <Menu.Item key="ja">
          <FormattedMessage id="lang.japaness" />
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={langMenu} placement="bottomRight">
        <Icon
          type="global"
          className={classNames(styles.dropDown, className)}
          title={intl.formatMessage({ id: 'navBar.lang' })}
        />
      </Dropdown>
    );
  }
}

export default SelectLang
