import type { Metadata, NextPage } from 'next'

export const metadata: Metadata = {
  title: 'title',
}

const Home: NextPage = () => {
  return (
    <div className="flex h-screen items-center justify-center text-5xl">
      サグラダファミリア
    </div>
  )
}

export default Home
