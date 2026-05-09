import React from 'react'
import { BsCheckCircle } from "react-icons/bs";
import './Services.css'

const servicesData = [
  { title: "Top Industry Experts" },
  { title: "Expertise in Diverse Fields" },
  { title: "Affordable Mentorship" },
  { title: "Extensive Expert Network" },
  { title: "Seamless Booking" },
  { title: "1-on-1 Guidance" },
  { title: "Personalized Mentorship" },
  { title: "Accelerated Growth" },
]

const Services = () => {
  return (
    <div className='services-section'>
      <div className="left">
        <img
          className='col2 row2'
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt=""
        />

        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          alt=""
        />

        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt=""
        />

        <img
          src="https://images.unsplash.com/photo-1516321497487-e288fb19713f"
          alt=""
        />

        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
          alt=""
        />
      </div>

      <div className="right">
        {servicesData.map((item, index) => (
          <div className="right-container" key={index}>
            <i><BsCheckCircle /></i>
            <div className='right-container__point'>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services