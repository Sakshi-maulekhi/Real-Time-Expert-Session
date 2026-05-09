import React from 'react'
import './EventTypes.css'
import { RiCodeSSlashLine, RiRobotLine, RiPencilRuler2Line, RiCompass3Line } from "react-icons/ri";

const iconsdata = [
    {
        icon: RiCodeSSlashLine,
        title: "Web Development",
    },
    {
        icon: RiRobotLine,
        title: "AI/ML",
    },
    {
        icon: RiPencilRuler2Line,
        title: "UI/UX",
    },
    {
        icon: RiCompass3Line,
        title: "Career Guidance",
    }
]

const EventTypes = () => {
    return (
        <div className="event-types-section">
            {iconsdata.map((item, index) => (
                <div className="event-types-section__icons" key={index}>
                    <i>{<item.icon />}</i>
                    <h2>{item.title}</h2>
                </div>
            ))}
        </div>
    )
}

export default EventTypes
