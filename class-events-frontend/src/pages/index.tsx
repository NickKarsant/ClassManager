import Layout from 'components/Layout'
import { API_URL } from '@/config/index'

export default function HomePage({classes}) {
  console.log(classes)
  const renderedClasses = classes.map((cl) =>{

    return (
      <div key={cl.classId}>
        <h3> 
          {cl.name}
        </h3>
        <img src={cl.image}/>
        <p>{cl.description}</p>
      </div>
    )
  })

  return (
    <Layout>
      <h1>Upcoming Classes</h1>
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
  const res = await fetch(`${API_URL}/api/events`)
  const classes = await parseJSON(res)
  return {props:{
    classes
  }}
}
