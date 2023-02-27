import React, {useState} from 'react'
import {useRouter} from 'next/router'
import styles from 'styles/Search.module.css'

type Props = {}

const Search = (props: Props) => {
  const {push } = useRouter();
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    push(`/classes/search?term=${term}`)
    setTerm('')
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input type='text' value={term} onChange={(evt) => setTerm(evt.target.value) }  placeholder='Search Events'/>
      </form>
    </div>
  )
}

export default Search