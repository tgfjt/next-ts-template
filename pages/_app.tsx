import NextApp from 'next/app';

import '../styles/style.css'

class MyApp extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Component {...pageProps} />
    );
  }
}

export default MyApp
