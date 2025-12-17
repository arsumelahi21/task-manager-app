import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta
          name="description"
          content="A simple and secure task management application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
      <Toaster position="top-right" />
    </>
  )
}
