import Layout from 'components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from 'styles/404.module.css'
type Props = {}

export default function NotFoundPage({}: Props) {
  const router = useRouter();
  return (
    <Layout title='Page Not Found'>
      <div className={styles.error}>
        <h1> 404</h1>
        <h4>
          Sorry, There is nothing here
        </h4>
        <button className={styles.button} onClick={() => router.back()}>Go Back</button>

      </div>
    </Layout>
  )
}