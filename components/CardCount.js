import React, { Component } from 'react'
import { css } from 'emotion';
import { Card } from 'antd';
import { Row, Col } from 'reactstrap'

export class CardCount extends Component {
    render() {
        const { data } = this.props
        return (
            <div className={css({ marginBottom: 20 })}>
                <Row>
                    {
                        data.map((item, i) => {
                            return <Col key={i} sm >
                                <Card className={css({ marginBottom: 20 })}>
                                    <h2 style={{fontWeight: 'inherit', color: '#909090'}}>{item.text}: {item.number}</h2>
                                </Card>
                            </Col>
                        })
                    }
                </Row>
            </div>
        )
    }
}

export default CardCount
