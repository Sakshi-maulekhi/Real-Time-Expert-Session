import React, { useState, useEffect } from 'react'
import EventCard from '../Components/EventCard/EventCard'

const Events = () => {
  const [experts, setExperts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')

  const fetchExperts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`http://localhost:8000/api/v1/events/search/getEventBySearch?name=${searchTerm}&category=${category}&page=${page}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const result = await res.json()
      setExperts(result.data)

      const countRes = await fetch(`http://localhost:8000/api/v1/events/search/getEventCount?name=${searchTerm}&category=${category}`)
      const countResult = await countRes.json()
      const totalCount = countResult.data || 0
      setPageCount(Math.ceil(totalCount / 8))
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchExperts()
  }, [page, category])

  const handleSearch = () => {
    setPage(0)
    fetchExperts()
  }

  return (
    <section>
      <div className="container" style={{ padding: '2rem 5%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Find an Expert</h2>
        
        <div className="search-filter-container" style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', justifyContent: 'center' }}>
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem 1rem', borderRadius: '5px', border: '1px solid #ccc', minWidth: '250px' }}
          />
          <select 
            value={category} 
            onChange={e => { setCategory(e.target.value); setPage(0); }}
            style={{ padding: '0.5rem 1rem', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="all">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="AI/ML">AI/ML</option>
            <option value="DSA">DSA</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Career Guidance">Career Guidance</option>
          </select>
          <button onClick={handleSearch} className="btn booking__btn" style={{ background: '#faa935', color: 'white', padding: '0.5rem 1.5rem', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Search</button>
        </div>

        {loading && <h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        {error && <h4 style={{ textAlign: 'center', color: 'red' }}>{error}</h4>}

        {!loading && !error && (
          <div className="event-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            {experts?.length === 0 ? (
              <h4 style={{ textAlign: 'center' }}>No experts found</h4>
            ) : (
              experts?.map(expert => (
                <div key={expert._id} style={{ width: '300px' }}>
                  <EventCard event={expert} />
                </div>
              ))
            )}
          </div>
        )}

        {pageCount > 1 && !loading && (
          <div className="pagination" style={{ display: 'flex', gap: '1rem', marginTop: '3rem', justifyContent: 'center' }}>
            {[...Array(pageCount).keys()].map(number => (
              <span 
                key={number} 
                onClick={() => setPage(number)}
                style={{
                  cursor: 'pointer',
                  padding: '5px 15px',
                  borderRadius: '5px',
                  backgroundColor: page === number ? '#faa935' : '#eee',
                  color: page === number ? '#fff' : '#000'
                }}
              >
                {number + 1}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Events