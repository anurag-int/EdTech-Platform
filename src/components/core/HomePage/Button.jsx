import React from 'react'
import { Link } from "react-router-dom"

const Button = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]
        ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"} hover:scale-95 transition-all duration-200 text-center text-[15px]`}>
            {children}
        </div>
    </Link>
  )
}

export default Button