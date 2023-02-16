import Link from 'next/link' 
import styles from '../styles/Footer.module.css'

type Props = {}

export default function Footer({}: Props) {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Class Events 2023</p>      
      <p>
        <Link href='/about'>About This Project
        </Link>
        </p>      
    </footer>
  )
}