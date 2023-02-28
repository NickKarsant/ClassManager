import Layout from 'components/Layout'
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import { API_URL } from '@/config/index'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Class.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


type Props = {}

export default function ClassPage({singleClass}: Props) {
  const {push} = useRouter();

  
  const singleClassData = singleClass?.attributes
  console.log('singleClass',  singleClassData)

  const deleteClass = async (e) => {

      if (confirm('Are you sure?')){
        const res = await fetch(`${API_URL}/api/class-events/${singleClass?.id}`, {
          method: 'DELETE', 
        })

        const data = await res.json()
        
        if (!res.ok){
          toast.error(data.message)
        } else {
          push('/classes')
        }
      }

}

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/classes/edit/${singleClass?.id}`} >
            <FaPencilAlt /> Edit Class
          </Link>
          <a href='#' onClick={deleteClass} className={styles.delete}>
          <FaTimes/> Delete Class
          </a> 
        </div>
        <span>
          {new Date(singleClassData?.date).toLocaleString('en-US')}
        </span>
          <h1>
            {singleClassData?.name}
          </h1>
          <ToastContainer />

          {singleClassData?.image && 
          <div className={styles.image}>
            <Image alt='dj equipment' width={800}  height={400}  src={singleClassData?.image?.data?.attributes?.formats?.medium.url} />
            </div>
          }
          <h3>
            Teaher: 
          </h3>
          <p >
          {singleClassData?.teacher}
            </p>  
          <h3>
            Room: 
          </h3>
          <p > 
          {singleClassData?.room}
            </p>   
          <h3>
            Description: 
          </h3>
          <p > 
          {singleClassData?.description}
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
  
  return {props:{
    singleClass: classes?.data?.[0]
  }, revalidate: 1}
}