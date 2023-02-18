import Layout from 'components/Layout'
import { API_URL } from '@/config/index'


type Props = {}

export default function ClassPage({singleClass}: Props) {
console.log(singleClass)
  return (
    <Layout>
      <h2>
        {singleClass?.name}
      </h2>
    </Layout>
  )
}



function parseJSON(response) {
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {}
  })
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`)
  const classes = await parseJSON(res)
  const paths = classes.map(cl => ( {params: {slug: cl.slug}} ))
  
  return {
    paths, fallback: true
  }
}

export async function getStaticProps( {params: {slug}} ){
  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const classes = await parseJSON(res)

  return {props:{
    singleClass: classes[0]
  }, revalidate: 1}
}