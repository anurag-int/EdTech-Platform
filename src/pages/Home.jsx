import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import  Highlight  from "../components/core/HomePage/Highlight"
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
const Home = () => {
  return (
    <div> 
        {/* Section-1 */}
        <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white'>
            <Link to={"/signup"}>
                <div className='group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>
        
            <div className='text-white text-center text-4xl font-semibold mt-7'>
                Empower Your Future with 
                <Highlight text={"Coding Skills"}/>
            </div>  

            <div className='w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access
                to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='mx-3 my-7 shadow-[8px_-10px_50px_-5px] shadow-blue-200'>
                <video loop autoPlay muted className="shadow-[20px_20px_rgba(255,255,255)]" >
                    <source src={Banner} type="video/mp4"/>
                </video>
            </div>

        </div>
        
        {/* Section-2 */}
        
       
        {/* Section-3 */}

        
        {/* Footer */}

    </div>
  )
}

export default Home