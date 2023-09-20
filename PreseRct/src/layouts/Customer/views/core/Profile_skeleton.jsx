import React from 'react'
import { useStateContext } from '../../../../contexts/ContextProvider';

export default function Profile_skeleton(details, toggleEdit) {
    const { currentUser } = useStateContext();
    const cities = ["Gjilan", "Prishtina", "Mitrovica", "Peja", "Ferizaj"];

    const handleCityChange = (event) => {
        setUser((prevUser) => ({
            ...prevUser,
            city: event.target.value,
        }));
    };

    return (
        <div className='parent bg-black bg-opacity-60 backdrop-blur-3xl h-screen w-screen flex flex-col items-center justify-center'>
            <title>Prese | Edit Profile</title>
            <div className='rounded-md bg-white p-12 shadow-xl w-screen flex items-center justify-center'>
                <form className='flex flex-col justify-center items-center rounded-md gap-4'>
                    <div className='flex flex-col items-center justify-center mb-10'>
                        <h1 className='font-semibold text-3xl text-center py-4'>Edit Your Profile</h1>
                        <p className='text-xl text-center'>
                            You can update your profile information here. Please note that for security reasons, your password cannot be changed here.
                        </p>
                    </div>
                    <div className='flex flex-row gap-4 items-center'>
                        <div className='flex items-center justify-center'>
                            <button type='button' onClick={() => toggleEdit('username')} disabled className={`${details.username ? 'bg-red-100 text-red-900' : 'bg-gray-100 text-gray-500'} py-2 px-2 hover:bg-gray-200 hover:text-gray-600 active:scale-105 rounded-full`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                        </div>
                        <div className={`flex flex-col px-2 py-1.5 ${details.username ? "" : "border-2 rounded-md shadow-sm"}`}>
                            <label for="username">Username</label>
                            <input
                                className={`${details.username ? 'border-gray-200 shadow-sm text-sm' : 'border-none bg-transparent text-gray-600'} duration-400 transition rounded-lg h-10 w-96`}
                                value={currentUser.name}
                                type="text" name="name" id="name" placeholder='prese' disabled={!details.username} />
                        </div>
                    </div>

                    <div className='flex flex-row gap-4 items-center'>
                        <div className='flex items-center justify-center'>
                            <button type='button' onClick={() => toggleEdit('email')} disabled className={`${details.email ? 'bg-red-100 text-red-900' : 'bg-gray-100 text-gray-500'} py-2 px-2 hover:bg-gray-200 hover:text-gray-600 active:scale-105 rounded-full`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                        </div>
                        <div className={`flex flex-col px-2 py-1.5 ${details.email ? "" : "border-2 rounded-md shadow-sm"}`}>
                            <label for="email">Email</label>
                            <input
                                className={`${details.email ? 'border-gray-200 shadow-sm text-sm' : 'border-none bg-transparent text-gray-600'} duration-400 transition rounded-lg h-10 w-96`}
                                value={currentUser.email}
                                type="email" name="email" id="email" placeholder='prese@domain.com' disabled={!details.email} />
                        </div>
                    </div>
                    <div className='flex flex-row gap-4 items-center'>
                        <div className='flex items-center justify-center'>
                            <button type='button' onClick={() => toggleEdit('city')} disabled className={`${details.city ? 'bg-red-100 text-red-900' : 'bg-gray-100 text-gray-500'} py-2 px-2 hover:bg-gray-200 hover:text-gray-600 active:scale-105 rounded-full`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                        </div>
                        <div className={`flex flex-col px-2 py-1.5 ${details.city ? "" : "border-2 rounded-md shadow-sm"}`}>
                            <label for="city">City</label>
                            <select
                                className={`${details.city ? 'border-gray-200 shadow-sm text-sm' : 'border-none bg-transparent'} duration-400 transition rounded-lg h-10 w-96`}
                                name='city'
                                id='city'
                                onChange={handleCityChange}
                                disabled={!details.city}
                            >
                                {cities.map((city) => (
                                    <option
                                        key={city} value={city} >
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row gap-4 items-center'>
                        <div className='flex items-center justify-center'>
                            <button type='button' onClick={() => toggleEdit('address')} disabled className={`${details.address ? 'bg-red-100 text-red-900' : 'bg-gray-100 text-gray-500'} py-2 px-2 hover:bg-gray-200 hover:text-gray-600 active:scale-105 rounded-full`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                        </div>
                        <div className={`flex flex-col px-2 py-1.5 ${details.address ? "" : "border-2 rounded-md shadow-sm"}`}>
                            <label for="address">Address</label>
                            <input
                                className={`${details.address ? 'border-gray-200 shadow-sm text-sm' : 'border-none bg-transparent text-gray-600'} duration-400 transition rounded-lg h-10 w-96`}
                                value={currentUser.address}
                                type="text" name="address" id="address" placeholder='Prese HQ'
                                disabled={!details.address} />
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button type='submit' className='bg-red-100 hover:scale-105 active:scale-100 active:cursor-wait transition hover:bg-red-200 mt-4 text-red-900 text-xl py-2 px-6 rounded-sm animate-pulse'>Updating Profile...</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
