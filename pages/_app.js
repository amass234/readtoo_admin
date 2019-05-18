import React from 'react'
import App, { Container } from 'next/app'
import store from '../stores';
import { Provider } from 'mobx-react'
import '../static/css/style.css'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Provider {...store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default MyApp