import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import 'cross-fetch/polyfill'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

// export const APOLLP_NAME_PROP_NAME="__APOLLP_STATE__"

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      //hasuraエンドポイント
      uri: process.env.NEXT_PUBLIC_HASURA_URL,
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY,
      },
    }),
    cache: new InMemoryCache(),
  })
}
export const initializeApollo = (initialState = null) => {
  //??はnullまたはundefindのときは右が実行される　SSRとSSG（apolloClient）は毎回undefind
  const _apolloClient = apolloClient ?? createApolloClient()
  // For SSG and SSR always create a new Apollo Client (SSF SSRは常に新しいClientを発行ｓるう)
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client (Client再度は最初の一回だけ)
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
