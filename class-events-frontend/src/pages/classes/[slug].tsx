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

export default function ClassPage({rawData}: Props) {
  const {push} = useRouter();
const singleClass = rawData?.attributes  
const deleteClass = async (e) => {

      if (confirm('Are you sure?')){
        const res = await fetch(`${API_URL}/api/class-events/${rawData?.id}`, {
          method: 'DELETE', 
        })

        const data = await res.json()
        console.log('data', data)
        
        if (!res.ok){
          toast.error(data.message)
        } else {
          push('/classes')
        }
      }

}
console.log(singleClass)
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/event/edit/${singleClass?.id}`} >
            <FaPencilAlt /> Edit Event
          </Link>
          <a href='#' onClick={deleteClass} className={styles.delete}>
          <FaTimes/> Delete Class
          </a> 
        </div>
        <span>
          {new Date(singleClass?.date).toLocaleString('en-US')}
        </span>
          <h1>
            {singleClass?.name}
          </h1>
          <ToastContainer />
          {singleClass?.image && 
          <div className={styles.image}>
            <Image alt='dj equipment' width={800}  height={400}  src={singleClass?.image?.data?.attributes?.formats?.medium?.url} />
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
  
  return {props:{
    rawData: classes?.data?.[0]}, revalidate: 1}
}