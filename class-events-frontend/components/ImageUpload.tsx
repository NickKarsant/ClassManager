import React from 'react'
import { useState } from 'react'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'


type Props = {classId: string}

export default function ImageUpload({classId, imageUploaded}: Props) {
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'api::class-event.class-event')
    formData.append('refId', classId)
    formData.append('field', 'image')

    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData
    })

    if (res.ok){
      imageUploaded()
    } 
 }
 const handleFileChange = (e) => {
  setImage(e.target.files[0])
}

return (
  <div className={styles.form}>
    <h1>Upload Event Image</h1>
    <form onSubmit={handleSubmit}>
      <div className={styles.file}>
        <input type='file' onChange={handleFileChange} />
      </div>
      <input type='submit' value='Upload' className='btn' />
    </form>
  </div>
)
}