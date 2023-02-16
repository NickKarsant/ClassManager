import Layout from 'components/Layout'
import { API_URL } from '@/config/index'

export default function HomePage({classes}) {
  console.log(classes)
  return (
    <Layout>
      <h1>Upcoming Classes</h1>
    </Layout>
  )
}


export async function getServerSideProps(){
  const res = await fetch(`${API_URL}/api/events`)
  const classes = await res.json()
  return {props:{
    classes
  }
}
}