import Link from 'next/link'
import Image from 'next/image'
import styles from 'styles/ClassItem.module.css'

type Props = {}

export default function ClassItem({cl}) {
  return (
    <div className={styles.event} >
        <Image alt={'description'} className={styles.img} width={170} height={100} src={cl.image ? cl.image : '/images/event-default.png'} />

        <div className={styles.info}>
          <span>
            {cl.day} at {cl.time}
          </span>
            <h3> 
              {cl.name}
            </h3>
          {cl.description}
        </div>

        <div className={styles.link}>
        <Link  className='btn' href={`/classes/${cl.slug}`}>
            Details
            </Link>
        </div>

    </div>
  )
}