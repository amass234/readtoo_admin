import React, { Component } from 'react'
import { List, Avatar, Select, Input, InputNumber, Icon, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import CardCount from './CardCount';

const Option = Select.Option;

@inject('userStore')
@observer
class UserList extends Component {

    state = { value: 'username', visible: false }

    async componentDidMount() {
        await this.props.userStore.getUserAll()
    }

    showModal = (id, credit) => {
        this.setState({
            visible: true,
            id,
            credit
        });
    }

    handleOk = () => {
        const { id, credit } = this.state
        this.setState({
            visible: false,
        });
        this.props.userStore.updateCredit(id, credit)
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            credit: 0,
            id: ''
        });
    }

    handleChange = (value) => {
        this.setState({ value })
    }

    render() {
        const { userList, loading, word } = this.props.userStore
        const { value } = this.state
        const outputUsername = userList.filter(this.props.userStore.searchingFor())
        const outputId = userList.filter(this.props.userStore.searchingForId())
        const selectBefore = (
            <Select defaultValue="username" onChange={this.handleChange}>
                <Option value="username">username</Option>
                <Option value="id">id</Option>
            </Select>
        );
        const selectAfter = (
            <Icon onClick={() => this.props.userStore.getUserAll()} type="redo" />
        );
        return (
            <div>
                <CardCount
                    data={[
                        { text: 'User', number: userList.length },
                        { text: 'Writer', number: userList.filter(e => e.isWriter === true).length },
                        { text: 'Reader', number: userList.filter(e => e.isWriter === false).length },
                    ]}
                />
                <Input
                    style={{ marginBottom: 20 }}
                    placeholder="Search User"
                    value={word}
                    addonBefore={selectBefore}
                    addonAfter={selectAfter}
                    onChange={(e) => this.props.userStore.searching(e.target.value)} />
                <List
                    itemLayout="horizontal"
                    loading={loading}
                    dataSource={value === "username" ? outputUsername : value === "id" && outputId}
                    renderItem={item => (
                        <List.Item actions={[<a onClick={() => this.showModal(item.id, item.readtoo_credit)}>edit</a>,
                        <a onClick={() => this.props.userStore.deleteUser(item.id)}>delete</a>]}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={
                                    <a href={`https://www.readtoo.me/author?id=${item.id}`} target="_blank">
                                        {item.username}
                                    </a>
                                }
                                description={
                                    <div>
                                        <p>id: {item.id} </p>
                                        <p>credit: {item.readtoo_credit} </p>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
                <Modal
                    title="Edit"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    Read Too Credit :
                    <InputNumber
                        min={0}
                        value={this.state.credit}
                        onChange={(value) => this.setState({ credit: value })}
                        style={{ width: 300, marginLeft: 20 }}
                    />
                </Modal>
            </div>
        )
    }
}

export default UserList
