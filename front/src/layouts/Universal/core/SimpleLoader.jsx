import React from 'react'
import logo_loader from '../images/logo-loader-g.gif'
export default function SimpleLoader() {
    return (
        <div className='h-screen w-screen flex justify-center items-center bg-[#fdfdfd]'>
            <img src={logo_loader} alt="" />
        </div>
    )
}
