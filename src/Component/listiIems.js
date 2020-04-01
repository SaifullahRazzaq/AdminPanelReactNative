import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink, Redirect } from 'react-router-dom';
const { Sider } = Layout;
class SideMenuNavigation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      navigationKey: props.navKey,
      isUserValid: true,
    };
  }
  componentDidMount = () => {
    if (localStorage.getItem('uid') === null) {
      this.setState({
        isUserValid: false,
      });
    }
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleClick({ key }) {
    if (key === '8') {
      localStorage.removeItem('uid');
    }
  }

  render() {
    const { navigationKey, isUserValid } = this.state;
    if (!isUserValid) {
      return <Redirect to='/' />;
    }
    return (
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={[navigationKey]}
          onClick={this.handleClick}
        >
          <Menu.Item key='1'>
            <Icon type='home' />
            <span>Home</span>
            <NavLink to='/home' />
          </Menu.Item>
          <Menu.Item key='2'>
            <Icon type='video-camera' theme='filled' />
            <span>Bayaan Section</span>
            <NavLink to='/video' />
          </Menu.Item>
          <Menu.Item key='3'>
            <Icon type='video-camera' />
            <span>Dua Section</span>
            <NavLink to='/picture' />
          </Menu.Item>
          <Menu.Item key='4'>
            <Icon type='upload' />
            <span>Event Section </span>
            <NavLink to='/event' />
          </Menu.Item>
          <Menu.Item key='5'>
            <Icon type='video-camera' />
            <span>Live Bayaan Section </span>
            <NavLink to='/liveVideo' />
          </Menu.Item>
          <Menu.Item key='6'>
            <Icon type='mail' />
            <span> Email Section </span>
            <NavLink to='/SubscribedEmail' />
          </Menu.Item>
          <Menu.Item key='7'>
            <Icon type='appstore' />
            <span> Category Section </span>
            <NavLink to='/category' />
          </Menu.Item>
          <Menu.Item key='8'>
            <Icon type='logout' />
            <span>Logout </span>
            <NavLink to='/' />
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideMenuNavigation;
