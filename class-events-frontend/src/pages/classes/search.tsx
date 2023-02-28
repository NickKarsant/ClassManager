import {useRouter} from 'next/router'
import Link from 'next/link'
import Layout from 'components/Layout'
import { API_URL } from '@/config/index'
import ClassItem from 'components/ClassItem'
import qs from 'qs'

export default function SearchPage({classes}) {
  const router = useRouter()
  return (
    <Layout title ='Search Results'>
      <Link href='/events'>Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {classes.length === 0 && <h3>No classes listed</h3>}
      {classes.map(({attributes}) => <ClassItem key={attributes.slug} cl={attributes}/>)}
    </Layout>
  )
}

function parseJSON(response) {
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {}
  })
}

export async function getServerSideProps({query: {term}}){

  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $contains: term,
            },
          },
          {
            teacher: {
              $contains: term,
            },
          },
          {
            description: {
              $contains: term,
            },
          },
          {
            room: {
              $contains: term,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );  
  const res = await fetch(`${API_URL}/api/class-events?${query}&populate=*`)
  const classes = await parseJSON(res)
  return {props:{
    classes: classes.data  }}
}
