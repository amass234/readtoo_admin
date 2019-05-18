import React, { Component } from 'react'
import { List, Avatar, Divider, Select, Input, Table, Icon, Tag } from 'antd';
import Link from 'next/link'
import { Row, Col } from 'reactstrap'
import { css } from 'emotion';
import { inject, observer } from 'mobx-react';
import CardCount from './CardCount';
import moment from 'moment';

const Option = Select.Option;

@inject('paymentStore')
@observer
class PaymentList extends Component {

    state = { value: 'title' }

    async componentDidMount() {
        await this.props.paymentStore.getPayment()
    }

    handleChange = (value) => {
        this.setState({ value })
    }
    render() {
        const { paymentList, loading_admin } = this.props.paymentStore
        const { value } = this.state
        // const outputTitle = paymentList.filter(this.props.novelStore.searchingFor())
        // const outputId = paymentList.filter(this.props.novelStore.searchingForId())
        const selectBefore = (
            <Select defaultValue="title" onChange={this.handleChange}>
                <Option value="title">title</Option>
                <Option value="id">id</Option>
            </Select>
        );
        const selectAfter = (
            <Icon onClick={() => this.props.novelStore.getNovelAll()} type="redo" />
        );
        const columnsdata_user = [{
            key: 'created_at',
            title: 'วันที่',
            render: (text, record) => {
                return moment(record.created_at).locale('th').format('LLL')
            },
            width: 200
        }, {
            key: 'amount',
            title: 'จำนวนเงิน',
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.amount - b.amount,
            width: 100
        }, {
            key: 'type',
            title: 'รูปแบบการชำระ',
            dataIndex: 'type',
            defaultSortOrder: 'descend',
            render: (text, record) => {
                return <span>{record.type === 'bank' ? 'ธนาคาร' : record.type}</span>
            },
            width: 200
        }, {
            key: 'bank',
            title: 'ธนาคาร',
            dataIndex: 'bank',
            defaultSortOrder: 'descend',
            render: (text, record) => {
                return <span>{record.bank === '' ? '-' : record.bank}</span>
            },
            width: 300
        }, {
            key: 'isVerify',
            title: 'สถานะ',
            dataIndex: 'isVerify',
            render: (text, record) => (
                <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ marginBottom: 10 }}>
                        {record.isVerify ? <Tag color="#87d068">อนุมัติ</Tag> :
                            <Tag color="#f50">"ยังไม่ได้อนุมัติ"</Tag>}
                    </div>
                </span>
            ),
            width: 100
        }, {
            key: 'view',
            title: ' ',
            render: (text, record) => (
                <span>
                    <Tag color="#87d068" style={{ lineHeight: 1 }}><Icon type="search" /></Tag>
                </span>
            ),
        }];
        return (
            <div>
                <CardCount
                    data={[
                        { text: 'Novel', number: paymentList.length },
                        { text: 'Verify', number: paymentList.length },
                        { text: 'No Verify', number: paymentList.length },
                    ]}
                />
                {/* <Input
                    style={{ marginBottom: 20 }}
                    placeholder="Search Novel"
                    value={word}
                    addonBefore={selectBefore}
                    addonAfter={selectAfter}
                    onChange={(e) => this.props.novelStore.searching(e.target.value)} /> */}
                <Table
                    loading={loading_admin}
                    columns={columnsdata_user}
                    dataSource={paymentList}
                />
            </div>
        )
    }
}

export default PaymentList
