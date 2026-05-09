import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RiStarFill, RiMedalLine, RiBriefcaseLine } from "react-icons/ri"

const EventDetails = () => {
  const { id } = useParams()
  const [expert, setExpert] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Booking Form State
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    slot: '',
    notes: ''
  })
  const [bookingStatus, setBookingStatus] = useState(null)

  useEffect(() => {
    const fetchExpert = async () => {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:8000/api/v1/events/${id}`)
        if (!res.ok) throw new Error('Failed to fetch expert details')
        const result = await res.json()
        setExpert(result.data)
      } catch (err) {
        setError(err.message)
      }
      setLoading(false)
    }
    fetchExpert()
  }, [id])

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value })
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    setBookingStatus({ type: 'loading', msg: 'Booking your session...' })

    try {
      const res = await fetch('http://localhost:8000/api/v1/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expert_id: expert._id,
          ...bookingData
        })
      })
      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || 'Failed to book session')
      }

      setBookingStatus({ type: 'success', msg: result.message })
      // Reset form
      setBookingData({
        name: '', email: '', phone: '', date: '', slot: '', notes: ''
      })
    } catch (err) {
      setBookingStatus({ type: 'error', msg: err.message })
    }
  }

  if (loading) return <h4 style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</h4>
  if (error) return <h4 style={{ textAlign: 'center', color: 'red', marginTop: '2rem' }}>{error}</h4>
  if (!expert) return null

  // Get available slots for the selected date
  const selectedDateSlots = expert.availableSlots?.find(s => s.date === bookingData.date)?.slots || []

  return (
    <section style={{ paddingTop: '100px' }}>
      <div className="container" style={{ padding: '2rem 5%', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>

        {/* Expert Profile Section */}
        <div className="expert-profile" style={{ flex: '1 1 500px' }}>
          <img
            src={expert.photo || 'https://via.placeholder.com/600'}
            alt={expert.name}
            style={{ width: '100%', borderRadius: '10px', marginBottom: '1.5rem', maxHeight: '400px', objectFit: 'contain' }}
          />
          <h2>{expert.name}</h2>

          <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0', color: '#666' }}>
            <span><i><RiStarFill color="#faa935" /></i> {expert.rating || 0}</span>
            <span><i><RiMedalLine color="#faa935" /></i> {expert.category}</span>
            <span><i><RiBriefcaseLine color="#faa935" /></i> {expert.experience} Years Exp.</span>
          </div>

          <h5 style={{ marginTop: '1.5rem' }}>Expertise</h5>
          <p>{expert.expertise}</p>

          <h5 style={{ marginTop: '1.5rem' }}>About</h5>
          <p>{expert.bio}</p>
        </div>

        {/* Booking Form Section */}
        <div className="booking-section" style={{ flex: '1 1 300px', backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '10px', height: 'fit-content' }}>
          <h3>Book a Session</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>Select an available date and time to book your expert consultation.</p>

          <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="text" name="name" placeholder="Full Name" value={bookingData.name} onChange={handleBookingChange} required style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="email" name="email" placeholder="Email Address" value={bookingData.email} onChange={handleBookingChange} required style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="tel" name="phone" placeholder="Phone Number" value={bookingData.phone} onChange={handleBookingChange} required style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc' }} />

            <select name="date" value={bookingData.date} onChange={handleBookingChange} required style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc' }}>
              <option value="">Select a Date</option>
              {expert.availableSlots?.map(slotObj => (
                <option key={slotObj.date} value={slotObj.date}>{slotObj.date}</option>
              ))}
            </select>

            <select name="slot" value={bookingData.slot} onChange={handleBookingChange} required disabled={!bookingData.date} style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc' }}>
              <option value="">Select a Time Slot</option>
              {selectedDateSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>

            <textarea name="notes" placeholder="Any specific topics to discuss? (Optional)" value={bookingData.notes} onChange={handleBookingChange} rows="3" style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc' }}></textarea>

            <button type="submit" className="btn booking__btn" style={{ background: '#faa935', color: 'white', padding: '1rem', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1rem', marginTop: '1rem' }}>
              Confirm Booking
            </button>
          </form>

          {bookingStatus && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              borderRadius: '5px',
              backgroundColor: bookingStatus.type === 'error' ? '#ffebee' : bookingStatus.type === 'success' ? '#e8f5e9' : '#e3f2fd',
              color: bookingStatus.type === 'error' ? '#c62828' : bookingStatus.type === 'success' ? '#2e7d32' : '#1565c0'
            }}>
              {bookingStatus.msg}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default EventDetails
