import '../styles/globals.css'
import "@material-tailwind/react/tailwind.css";
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react';
import '../styles/styles.css'
import '../components/textEditor/editorStyles.css'
function MyApp({Component,pageProps})
{
  return (
    <>
    <Head>
    <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"/>
<title>Meti-GoogleDocs</title>

    </Head>
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
    </>
  )
}

export default MyApp
