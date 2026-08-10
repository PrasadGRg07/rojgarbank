import React from 'react'
import Jobcards from './Jobcards'
const randomJobs = [1, 2, 3, 4];

const levels = ["Senior", "Mid", "Junior", "Entry Level", "Fresher"];
const categories = ["All Categories", "IT", "Finance", "Marketing", "Engineering"];



const LatestJobs = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 my-10 sm:my-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-left">
                <span className="text-[#6A38C2]">Latest & Trending </span>Job Openings</h2>

            {/* Jobcards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                { 
                    randomJobs.map((job, index) => (

                        <Jobcards key={index}/>
                    ))}
            </div>
            

        </div>
    )
}

export default LatestJobs