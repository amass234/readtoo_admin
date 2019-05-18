import React, { Component } from 'react'
import { List, Avatar, Divider, Select, Input, Card, Icon } from 'antd';
import Link from 'next/link'
import { Row, Col } from 'reactstrap'
import { css } from 'emotion';
import { inject, observer } from 'mobx-react';
import CardCount from './CardCount';

const Option = Select.Option;

@inject('novelStore')
@observer
class NovelList extends Component {
    state = { value: 'title' }

    async componentDidMount() {
        await this.props.novelStore.getNovelAll()
    }

    handleChange = (value) => {
        this.setState({ value })
    }
    render() {
        const { novelList, loading, word } = this.props.novelStore
        const { value } = this.state
        const outputTitle = novelList.filter(this.props.novelStore.searchingFor())
        const outputId = novelList.filter(this.props.novelStore.searchingForId())
        const selectBefore = (
            <Select defaultValue="title" onChange={this.handleChange}>
                <Option value="title">title</Option>
                <Option value="id">id</Option>
            </Select>
        );
        const selectAfter = (
            <Icon onClick={() => this.props.novelStore.getNovelAll()} type="redo" />
        );
        return (
            <div>
                <CardCount
                    data={[
                        { text: 'Novel', number: novelList.length },
                    ]}
                />
                <Input
                    style={{ marginBottom: 20 }}
                    placeholder="Search Novel"
                    addonBefore={selectBefore}
                    addonAfter={selectAfter}
                    value={word}
                    onChange={(e) => this.props.novelStore.searching(e.target.value)} />
                <List
                    itemLayout="horizontal"
                    loading={loading}
                    dataSource={value === "title" ? outputTitle : value === "id" && outputId}
                    renderItem={item => (
                        <List.Item actions={[<a>edit</a>, <a 
                        onClick={()=> this.props.novelStore.deleteNovel(item.id)}>delete</a>]}>
                            <List.Item.Meta
                                avatar={<Avatar shape="square" style={{ width: 39, height: 50 }} src={item.cover} />}
                                title={
                                    <a href={`https://www.readtoo.me/novel-${item.id}`} target="_blank">
                                        {item.title}
                                    </a>
                                }
                                description={
                                    item.catalog.map(cat => {
                                        return `${cat} ,`
                                    })
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default NovelList
