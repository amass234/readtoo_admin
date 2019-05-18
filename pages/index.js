import React, { Component } from 'react'
import { withRouter } from 'next/router'
import SiderBar from '../components/SiderBar';
import UserList from '../components/UserList';
import NovelList from '../components/NovelList';
import PaymentList from '../components/PaymentList';

export class Home extends Component {
  render() {
    const { id } = this.props.router.query
    return (
      <div>
        <SiderBar id={id}>
          {
            id === "novels" ?
              <NovelList /> :
              id === "payment" ?
                <PaymentList /> :
                <UserList />
          }
        </SiderBar>
      </div>
    )
  }
}

export default withRouter(Home)

