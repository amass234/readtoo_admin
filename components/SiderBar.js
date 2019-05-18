import React, { Component } from 'react'
import { Layout, Menu, Icon, Popover, Dropdown } from 'antd';
import Link from 'next/link'
import { css } from 'emotion';
import { inject, observer } from 'mobx-react';
import Login from './Login';

const { Header, Sider, Content } = Layout;

@inject('commonStore', 'authStore')
@observer
class SiderBar extends Component {
    state = {
        collapsed: false,
        fontSize: 20,
        margin: '81px 15px 40px 215px'
    };

    componentDidMount() {
        this.props.authStore.getUser()
    }

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            fontSize: collapsed ? 10 : 20,
            margin: collapsed ? '81px 15px 40px 15px' : '81px 15px 40px 215px'
        });
    }
    render() {
        const { collapsed, fontSize, margin } = this.state
        const { appName } = this.props.commonStore
        const { displayName, email, user } = this.props.authStore
        const { id } = this.props
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={() => this.props.authStore.logOut()}>Logout</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    // trigger={null}
                    // collapsible
                    // collapsed={collapsed}
                    onCollapse={this.onCollapse}
                    breakpoint="lg"
                    collapsedWidth="0"
                    style={{
                        background: '#607D8B',
                        position: 'fixed',
                        minHeight: '100vh',
                        zIndex: 2
                    }}
                >
                    <div className="logo" style={{ fontSize }}>{appName}</div>
                    <Menu theme="dark" style={{ background: '#607D8B' }} mode="inline" selectedKeys={[id]} defaultSelectedKeys={["user"]}>
                        <Menu.Item key="users">
                            <Icon type="user" />
                            <Link href="/?id=users"><span>Users</span></Link>
                        </Menu.Item>
                        <Menu.Item key="novels">
                            <Icon type="align-right" />
                            <Link href="/?id=novels"><span>Novels</span></Link>
                        </Menu.Item>
                        <Menu.Item key="payment">
                            <Icon type="upload" />
                            <Link href="/?id=payment"><span>Payment</span></Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className={css({
                        background: '#fff',
                        padding: 0,
                        position: 'fixed',
                        width: '100%',
                        zIndex: 1,
                        boxShadow: '2px 0 20px #d6d6d6',
                    })}>
                        <div className={css({
                            float: 'right',
                            margin: '0 15px',
                            fontSize: 18
                        })}>
                            <div>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a>
                                        {displayName}
                                    </a>
                                </Dropdown>
                            </div>
                        </div>
                    </Header>
                    <Content className={css({
                        margin, padding: 24, background: '#fff', minHeight: 280,
                    })}>{user ? this.props.children : <Login />}</Content>
                </Layout>
            </Layout>
        );
    }
}

export default SiderBar
