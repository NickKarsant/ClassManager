import styles from '../styles/Showcase.module.css'

type Props = {}

export default function Showcase({}: Props) {
  return (
    <div className={styles.showcase}>
      <h1>
        Welcome to Class Management
      </h1>
      <h2>Manage your studio classes and schedule</h2>
    </div>
  )
}