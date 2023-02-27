import Layout from 'components/Layout'
import { useState } from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'

type Props = {}

export default function AddClassPage({}: Props) {
  const [values, setValues] = useState({
    name:'',
    teacher:'',
    room:'',
    date:'',
    description:'',
    another:''
  })

  const router = useRouter()

  const handleInputChange = (e) => {
    const {name, value } = e.target
    setValues({...values, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values)
  }
  
  return (
    <Layout title='Add New Class'>
      <h1>Add a Class</h1>
      <Link href='/classes'> Go Back</Link>
      <h1>Add Event</h1>
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
        
      <input type="submit" value="Add Class" className='btn' />

      </form>
    </Layout>
  )
}