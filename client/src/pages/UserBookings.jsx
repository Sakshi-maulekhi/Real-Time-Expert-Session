import React, { useState, useEffect, useContext } from 'react'

const UserBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Assuming email might be fetched from a global auth state or localStorage
  // For demo purposes, we will use an input to simulate "logged in user email"
  const [email, setEmail] = useState('sakshimaulekhi84@gmail.com')

  const fetchBookings = async () => {
    if (!email) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`http://localhost:8000/api/v1/booking?email=${email}`)
      if (!res.ok) throw new Error('Failed to fetch bookings')
      const result = await res.json()
      setBookings(result.data)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBookings()
  }, [email])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#f57c00'
      case 'Confirmed': return '#388e3c'
      case 'Completed': return '#1976d2'
      default: return '#666'
    }
  }

  return (
    <section>
      <div className="container" style={{ padding: '2rem 5%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>My Session Bookings</h2>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p>Enter your email to view your bookings:</p>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', minWidth: '250px' }}
          />
        </div>

        {loading && <h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        {error && <h4 style={{ textAlign: 'center', color: 'red' }}>{error}</h4>}

        {!loading && !error && bookings.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                  <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Expert Name</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Date</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Time Slot</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '1rem' }}>{booking.expert_id?.name || 'Unknown Expert'}</td>
                    <td style={{ padding: '1rem' }}>{booking.date}</td>
                    <td style={{ padding: '1rem' }}>{booking.slot}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        color: '#fff',
                        backgroundColor: getStatusColor(booking.status),
                        display: 'inline-block',
                        minWidth: '80px',
                        textAlign: 'center'
                      }}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && email && bookings.length === 0 && (
          <h4 style={{ textAlign: 'center', color: '#666' }}>No bookings found for {email}.</h4>
        )}
      </div>
    </section>
  )
}

export default UserBookings
