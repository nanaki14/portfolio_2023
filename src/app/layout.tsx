import { FC, ReactNode } from 'react'
import NextHead from 'next/head'
import clsx from 'clsx'
/* eslint-disable-next-line camelcase */
import { Noto_Sans_JP } from 'next/font/google'

import { Metadata } from 'next'
import { constants } from '@/constants'
import '@/styles/style.css'
import { BgCanvas } from '@/components/BgCanvas'

const notoSans = Noto_Sans_JP({ preload: false, weight: ['100', '500'] })

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
      <body className={clsx('bg-theme relative', notoSans.className)}>
        <div className="absolute inset-0">
          <BgCanvas />
          <div className="BgNoise absolute inset-0" />
          <div
            className="bg-theme absolute inset-0 right-content z-10"
            style={{
              clipPath:
                'polygon(0% 0%, 0% 100%, 10% 100%, 10% 10%, 90% 10%, 90% 90%, 10% 90%, 10% 100%, 100% 100%, 100% 0%)',
            }}
          />
        </div>
        <div className="relative z-10 ml-auto h-full max-w-[580px]">
          <main className="bg-theme mr-12 min-h-full shadow-xl">
            {props.children}
          </main>
          <div className="absolute inset-y-0 right-0 flex w-12 text-xs writing-mode-vertical">
            <a
              className="flex h-full items-center justify-center border-l font-light text-white"
              role="button"
            >
              MENU
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
