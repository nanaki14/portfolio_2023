import { FC, ReactNode } from 'react'
import NextHead from 'next/head'

import { Metadata } from 'next'
import { constants } from '@/constants'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = constants.meta

const RootLayout: FC<Props> = (props) => {
  return (
    <html lang="ja">
      <NextHead>
        <meta
          content="width=device-width, initial-scale=1,user-scalable=no"
          name="viewport"
        />
      </NextHead>
      <body>
        <main>{props.children}</main>
      </body>
    </html>
  )
}

export default RootLayout
