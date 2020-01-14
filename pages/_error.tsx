import * as React from 'react'
import Link from 'next/link'
import { NextPageContext } from 'next'
import Layout from '../components/Layout'

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
}

export type ErrorProps = {
  statusCode: number
  title?: string
}

export default class Error<P = {}> extends React.Component<P & ErrorProps> {
  static displayName = 'ErrorPage'

  static getInitialProps({
    res,
    err,
  }: NextPageContext): Promise<ErrorProps> | ErrorProps {
    const statusCode =
      res && res.statusCode ? res.statusCode : err ? err.statusCode! : 404
    return { statusCode }
  }

  render() {
    const { statusCode } = this.props
    const title =
      this.props.title ||
      statusCodes[statusCode] ||
      'An unexpected error has occurred'

    return (
      <Layout title={`${statusCode}: ${title}`}>
        <h1>Sorry, {title}</h1>
        <p>
          <Link href="/">
            <a>Go home</a>
          </Link>
        </p>
      </Layout>
    )
  }
}