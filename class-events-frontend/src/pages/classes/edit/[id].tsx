import Layout from 'components/Layout'
import Modal from 'components/Modal'
import { useState } from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import formatDateForInput from '../../utils/format'
import {FaImage} from 'react-icons/fa'

type Props = {}

export default function EditClassPage({singleClassRawData}: Props) {

  const singleClass = singleClassRawData.attributes
  const rawDate =  new Date(singleClass.date).toLocaleString('en-US').split(', ')
  const time = rawDate[1].slice(0, 5) + rawDate[1].slice(8, 11)
  
  const [showModal, setShowModal] = useState(false)

  const [values, setValues] = useState({
    name: singleClass.name,
    teacher:singleClass.teacher,
    room:singleClass.room,
    date:formatDateForInput(singleClass.date),
    description:singleClass.description,
    another:singleClass.another,
    time:time,
  })

  const [imagePreview, setImagePreview] = useState(singleClass.image ? singleClass.image.data.attributes.formats.thumbnail.url : null)

  const router = useRouter()

  const handleInputChange = (e) => {
    const {name, value } = e.target
    setValues({...values, [name]:value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if true we want an error because there are empty fields
    const hasEmptyFields = Object.values(values).some((el) => el === '')
  
    if(hasEmptyFields){
      toast.error('Please fill in all fields')
      return;
    }

    const res = await fetch(`${API_URL}/api/class-events/${singleClassRawData.id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ data: values }),
    })

    if (!res.ok){
      toast.error('Something went wrong')
    } else {
      toast.success("Class Successfully Added!")


      const  json = await res.json()
      const  evt = json.data.attributes
      router.push(`/classes/${evt.slug}`)
    }
  }
  
  return (
    <Layout title='Add New Class'>
      <h1>Edit a Class</h1>
      <Link href='/classes'> Go Back</Link>
      <h1>Edit Class</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>
            Class Name
            </label>
            <input type='text' id='name' name='name' value={values.name} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor='teacher'>
            Teacher
            </label>
            <input type='text' id='teacher' name='teacher' value={values.teacher} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor='room'>
            Room
            </label>
            <input type='text' id='room' name='room' value={values.room} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor='time'>
            Time
            </label>
            <input type='text' id='time' name='time' value={values.time} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor='date'>
            Date
            </label>
            <input type='date' id='date' name='date' value={values.date} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor='another'>
            Another
            </label>
            <input type='text' id='another' name='another' value={values.another} onChange={handleInputChange}/>
          </div>
        </div>
        
      <div>
        <label htmlFor='description'>Class Description</label>
        <textarea
          type='text'
          name='description'
          id='description'
          value={values.description}
          onChange={handleInputChange}
          >
        </textarea>
      </div>
      
      <ToastContainer />

      <input type="submit" value="Update Class" className='btn' />

      </form>
      
      <h2> Class Image</h2>
        {imagePreview ? (
          <Image src={imagePreview} height={100} width={170}/>
          ) : (
            <div>
            <p>
              No Image uploaded
            </p>
          </div>
        )}

        <div>
          <button onClick={() => setShowModal(true)} className='btn-secondary'><FaImage/> Set Image </button>
        </div>
        <Modal show={showModal} onClose ={() => setShowModal(false)}>
          IMAGE UPLOAD
        </Modal>
    </Layout>
  )
}


function parseJSON(response) {
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {}
  })
}

export async function getServerSideProps({params: {id}}){
  const res = await fetch(`${API_URL}/api/class-events/${id}/?[populate]=*`)
  const classes = await parseJSON(res)
  return {props:{
    singleClassRawData: classes.data
  }}
}