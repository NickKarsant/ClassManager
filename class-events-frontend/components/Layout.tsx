import Head from 'next/head'
import styles from '../styles/Layout.module.css'

type Props = {}

export default function Layout({title, keywords, description, children}: Props) {
  return (
    <div>

    <Head>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
      </Head>
      <div className={styles.container}>
      {children}

      </div>
    </div>
  )
}

Layout.defaultsProps = {
  title: 'Acrobatics | Find the mobility class for you!',
  description: 'This is an app to CRUD a class event for your studios schedule',
  keywords: 'circus, acrobatics, exercise, flow, firespinning, workout'
  
}