import Layout from 'components/Layout'
import { API_URL } from '@/config/index'
import ClassItem from 'components/ClassItem'

export default function ClassesPage({classes}) {
  const renderedClasses = classes.map(({attributes}) =>{
    return (
      <ClassItem key={attributes.slug} cl={attributes}/>
    )
  })
  return (
    <Layout>
      <h1>Upcoming Classes</h1>
      {classes.length === 0 && <h3>No classes listed</h3>}
      {renderedClasses}
    </Layout>
  )
}

function parseJSON(response) {
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {}
  })
}

export async function getServerSideProps(){
  const res = await fetch(`${API_URL}/api/class-events?[populate]=*`)
  const classes = await parseJSON(res)
  return {props:{
    classes: classes.data  }}
}
