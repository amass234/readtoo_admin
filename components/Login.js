import React, { Component } from 'react'
import {
    Form, Icon, Input, Button,
} from 'antd';
import { css } from 'emotion';
import { inject, observer } from 'mobx-react';

@inject('authStore')
@observer
class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.authStore.login()
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.props.authStore
        return (
            <div className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh'
            })}>
                <div className={css({ margin: 'auto', width: 300 })}>
                    <h1>Log In</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                    onChange={() => this.props.authStore.setUsername(userName.value)} />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    onChange={() => this.props.authStore.setPassword(password.value)} />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(Login);