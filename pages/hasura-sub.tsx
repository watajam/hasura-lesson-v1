import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { Layout } from '../components/Layout'
import { GetUsersQuery } from '../types/generated/graphql.tsx/graphql'
import { GET_USERS_LOCAL } from '../queries/queries'

const FetchSub: VFC = () => {
  //GET_USERS_LOCALクエリは@clientが追加されていると存在するローカルのキャッシュの中身を読みに行くので、設定は不要
  const { data } = useQuery<GetUsersQuery>(GET_USERS_LOCAL)
  return (
    <Layout title="Hasura fetchPolicy read cache">
      <p className="mb-6 font-bold">Direct read out from cache</p>
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-main">
        <a className="mt-6">Back</a>
      </Link>
    </Layout>
  )
}
export default FetchSub
