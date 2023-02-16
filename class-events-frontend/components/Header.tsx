import Link from 'next/link'
import styles from 'styles/Header.module.css'

type Props = {}

export default function Header({}: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='./'>
          Class Events
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href='./classes'>
              All Classes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}