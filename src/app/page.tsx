import type { Metadata, NextPage } from 'next'

export const metadata: Metadata = {
  title: 'title',
}

const Home: NextPage = () => {
  return (
    <>
      <div>top page</div>
    </>
  )
}

export default Home
