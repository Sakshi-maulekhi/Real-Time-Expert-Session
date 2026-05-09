import React from 'react'
import { Link } from 'react-router-dom'
import './EventCard.css'
import { RiStarFill, RiMedalLine, RiBriefcaseLine } from "react-icons/ri";

const EventCard = ({ event }) => {

    // We still pass "event" prop as per existing code but it contains expert data
    const { _id, name, category, experience, photo, rating, featured } = event

    return (
        <div className='card'>
            <div className="event__img">
                <img src={photo || 'https://via.placeholder.com/300'} alt="expert-img" />
                {featured && <span>Featured</span>}
            </div>

            <div className='card-body'>
                <div className="card__top">
                    <span className="event__rating">
                        <i><RiStarFill/></i>
                        {rating || 0}
                    </span>

                    <h5 className="event__title"><Link to={`/events/${_id}`}>{name}</Link></h5>

                    <span className="event__location">
                        <div className='venue'><i><RiMedalLine/></i> {category}</div>
                        <div className='address'><i><RiBriefcaseLine/></i> {experience} Years Exp.</div>
                    </span>
                </div>

                <div className="card__bottom" style={{ justifyContent: 'center' }}>
                    <button className="btn booking__btn" style={{ width: '100%' }}>
                        <Link to={`/events/${_id}`} style={{ width: '100%', display: 'block' }}> View Profile </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EventCard
