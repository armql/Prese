import React from 'react';

export default function NotFound() {
    return (
        <div class="relative h-screen w-screen bg-white backdrop-blur-sm bg-opacity-70">
            <div className='h-screen text-[16vw] font-bold z-0 flex justify-around items-center text-center'>
                404
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-60 h-60 text-red-400 animate-pulse">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <div className='absolute flex bg-white backdrop-blur-sm bg-opacity-20 h-screen w-screen justify-center items-center'>
                    <div className='flex justify-evenly font-bold text-4xl items-start p-12 w-full h-full'>
                        <div className='flex flex-col text-start'>
                            Looks like you've found the<span>
                                doorway to the great nothing</span>
                            <p className='text-xl font-normal text-start'>Sorry about that! Please visit our hompage to get where you need to go.</p>
                        </div>
                        <div className='flex items-center justify-center text-center pt-14 bg-red-200 hover:bg-red-300 transition '>
                            <button className=' p-2 text-red-600 transition-all font-bold hover:underline rounded-full'>Take me there</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
