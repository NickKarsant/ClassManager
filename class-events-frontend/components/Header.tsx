import Link from 'next/link'
import Search from './Search'
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
      <Search/>
      <nav>
        <ul>
          <li>
            <Link href='/classes'>
              All Classes
            </Link>
          </li>
          <li>
            <Link href='/classes/add'>
              Add Class
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}