import React,{useRef} from 'react'
import './SearchBar.css'
import { useNavigate } from 'react-router-dom' 
import { Button } from 'reactstrap'

const SearchBar = () => {

  const nameRef = useRef('')
  const categoryRef = useRef('')
  const experienceRef = useRef('')
  const navigate = useNavigate()

  const searchHandler = (e)=>{
    e.preventDefault()
    const name = nameRef.current.value
    const category = categoryRef.current.value || 'all'
    const experience = experienceRef.current.value

    navigate(`/events?name=${name}&category=${category}`)
  }

  return (
    <section className='search-bar'>
        <div className="form">
          <form className='form__grid' onSubmit={searchHandler}>
            <h1>Find The Right Expert For Your Learning Journey.</h1>
            <input type="text" placeholder='Search Expert Name' ref={nameRef}/>
            <select ref={categoryRef} defaultValue="" style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}>
              <option value="" disabled>Select Category</option>
              <option value="all">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="DSA">DSA</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Career Guidance">Career Guidance</option>
            </select>
            <input type="number" placeholder='Min Experience (yrs)' ref={experienceRef}/>
            <Button className='primary__btn search-bar__btn' type='submit'>Search Expert</Button>
          </form>
        </div>
    </section>
  )
}

export default SearchBar