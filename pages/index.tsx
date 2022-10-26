import { VFC } from 'react'
import { Layout } from '../components/Layout'

const Home: VFC = () => {
  return (
    <Layout title="Home">
      <p className="font-mono text-3xl">Next.js + GraphQL</p>
    </Layout>
  )
}

export default Home
