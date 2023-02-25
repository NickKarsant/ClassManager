import Layout from 'components/Layout'
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import { API_URL } from '@/config/index'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Class.module.css'


type Props = {}

export default function ClassPage({singleClass}: Props) {

  console.log('ClassPage', singleClass)
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/event/edit/${singleClass?.id}`} >
            <FaPencilAlt /> Edit Event
          </Link>
          <a href='#' className={styles.delete}>
          <FaTimes/> Delete Class
          </a> 
        </div>
        <span>
          {new Date(singleClass?.date).toLocaleString('en-US')}
        </span>
          <h1>
            {singleClass?.name}
          </h1>
          {singleClass?.image && 
          <div className={styles.image}>
            <Image alt='dj equipment' width={960}  height={600}  src={singleClass?.image}/>
            </div>
          }
          <h3>
            Teaher: 
          </h3>
          <p >
          {singleClass?.teacher}
            </p>  
          <h3>
            Room: 
          </h3>
          <p > 
          {singleClass?.room}
            </p>   
          <h3>
            Description: 
          </h3>
          <p > 
          {singleClass?.description}
            </p> 
            <Link className={styles.back} href='/classes'>
            {'<'} Go Back
            </Link>  
      </div>
    </Layout>
  )
}



function parseJSON(response) {
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {}
  })
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/class-events`)
  const classes = await parseJSON(res)
  const paths = classes?.data?.map(cl => ( {params: {slug: cl.attributes.slug}} ))
  return {
    paths, fallback: true
  }
}

export async function getStaticProps( {params: {slug}} ){
  const res = await fetch(`${API_URL}/api/class-events?filters[slug][$eq]=${slug}&populate=*`)
  const classes = await parseJSON(res)
  // console.log('after fetch classes', classes.data)
  
  return {props:{
    singleClass: classes?.data?.[0].attributes
  }, revalidate: 1}
}