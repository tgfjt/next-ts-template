import * as React from 'react'
import Link from 'next/link'
import { User } from '../interfaces'
import css from '../styles/components/listitem.css';

type Props = {
  data: User
}

const ListItem: React.FunctionComponent<Props> = ({ data }) => (
  <Link href="/users/[id]" as={`/users/${data.id}`}>
    <a className={css.listitem}>
      {data.id}: {data.name}
    </a>
  </Link>
)

export default ListItem
