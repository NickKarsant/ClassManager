import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import Header from './Header'
import Footer from './Footer'

type Props = {}

export default function Layout({title, keywords, description, children}: Props) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
      </Head>
      <Header />
        <div className={styles.container}>
          {children}
        </div>
        <Footer />
    </div>
  )
}

Layout.defaultsProps = {
  title: 'Acrobatics | Find the mobility class for you!',
  description: 'This is an app to CRUD a class event for your studios schedule',
  keywords: 'circus, acrobatics, exercise, flow, firespinning, workout'
  
}