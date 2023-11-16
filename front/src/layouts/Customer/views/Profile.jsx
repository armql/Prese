import React, { useEffect, useState } from 'react';
import axiosClient from '../../../api/axios';
import { useStateContext } from '../../../contexts/ContextProvider';
import SimpleLoader from '../../Universal/core/SimpleLoader';
import Swal from 'sweetalert2';
import ProfileSkeleton from './core/Profile_skeleton';

export default function Profile() {
  const { currentUser, setCurrentUser } = useStateContext();
  const [validating, setValidating] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [inputErrorList, setInputErrorList] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
  });

  const [details, setDetails] = useState({
    username: false,
    email: false,
    city: false,
    address: false,
  });

  const cities = ["Gjilan", "Prishtina", "Mitrovica", "Peja", "Ferizaj"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUserResponse = await axiosClient.get('/me');
        setCurrentUser(currentUserResponse.data);

        const userProfileResponse = await axiosClient.get(`user/${currentUserResponse.data.id}/edit`);
        setUser(userProfileResponse.data.user);
        setValidating(false);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            alert(error.response.data.message);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
          }
        }
      }
    };

    fetchData();
  }, []);

  const editUser = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const data = {
      name: user.name,
      email: user.email,
      address: user.address,
      city: user.city,
    };

    try {
      const res = await axiosClient.put(`/userprofile/${currentUser.id}`, data);
      Swal.fire({
        icon: "success",
        text: res.data.message,
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          setInputErrorList(error.response.data.errors);
        }
        if (error.response.status === 404) {
          alert(error.response.data.message);
        }
        if (error.response.status === 500) {
          setGlobalError(error.response.data);
        }
      }
    } finally {
      setDetails({
        username: false,
        email: false,
        city: false,
        address: false,
      });
      setSubmitting(false);
    }
  };

  const toggleEdit = (field) => {
    setDetails((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInput = (event) => {
    event.persist();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleCityChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      city: event.target.value,
    }));
  };


  if (validating) {
    return <SimpleLoader />
  }

  if (submitting) {
    return <ProfileSkeleton
      details={details}
      toggleEdit={toggleEdit}
      cities={cities}
      handleCityChange={handleCityChange}
    />
  }

  return (
    <div className='parent bg-black bg-opacity-60 backdrop-blur-3xl h-screen w-screen flex flex-col items-center justify-center'>
      <title>Prese | Edit Profile</title>
      <div className='rounded-md bg-white p-12 shadow-xl w-screen flex items-center justify-center'>
        <form onSubmit={(event) => editUser(event)} className='flex flex-col justify-center items-center rounded-md gap-4'>
          <div className='flex flex-col items-center justify-center mb-10'>
            <h1 className='font-semibold text-3xl text-center py-4'>Edit Your Profile</h1>
            <p className='text-xl text-center'>
              You can update your profile information here. Please note that for security reasons, your password cannot be changed here.
            </p>

          </div>
          <div className='flex flex-row gap-4 items-center'>
            <div className='flex items-center justify-center'>
              <button type='button' onClick={() => toggleEdit('username')} className={`${details.username ? 'bg-red-100 text-red-900' : 'bg-gray-100 text-gray-500'} py-2 px-2 hover:bg-gray-200 hover:text-gray-600 active:scale-105 rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </button>
            </div>
            <div className={`flex flex-col px-2 py-1.5 ${details.username ? "" : "border-2 rounded-md shadow-sm"}`}>
              <label htmlFor="username">Username</label>
              <input
                className={`${details.username ? 'border-gray-200 shadow-sm text-sm' : 'border-none bg-transparent text-gray-600'} duration-400 transition rounded-lg h-10 w-96`}
                onChange={handleInput}
                type="text" value={user.name} name="name" id="name" placeholder='prese' disabled={!details.username} />
            </div>
          </div>

          <div className='flex flex-row gap-4 items-center'>
            <div className='flex items-center justify-center'>
              <button type='button' onClick={() => toggleEdit('email')} className={`${details.email ? 'bg-red-100 text-red-900' : 'bg-gray-100 text-gray-500'} py-2 px-2 hover:bg-gray-200 hover:text-gray-600 active:scale-105 rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </button>
            </div>
            <div className={`flex flex-col px-2 py-1.5 ${details.email ? "" : "border-2 rounded-md shadow-sm"}`}>
              <label htmlFor="email">Email</label>
              <input
                className={`${details.email ? 'border-gray-200 shadow-sm text-sm' : 'border-none bg-transparent text-gray-600'} duration-400 transition rounded-lg h-10 w-96`}
                onChange={handleInput}
                type="email" value={user.email} name="email" id="email" placeholder='prese@domain.com' disabled={!details.email} />
            </div>
          </div>
          <div className='flex flex-row gap-4 items-center'>
            <div className='flex items-center justify-center'>
              <button type='button' onClick={() => toggleEdit('city')} className={`${details.city ? 'bg-red-100 text-red-900' : 'bg-gray-100 text-gray-500'} py-2 px-2 hover:bg-gray-200 hover:text-gray-600 active:scale-105 rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </button>
            </div>
            <div className={`flex flex-col px-2 py-1.5 ${details.city ? "" : "border-2 rounded-md shadow-sm"}`}>
              <label htmlFor="city">City</label>
              <select
                className={`${details.city ? 'border-gray-200 shadow-sm text-sm' : 'border-none bg-transparent'} duration-400 transition rounded-lg h-10 w-96`}
                name='city'
                id='city'
                onChange={handleCityChange}
                disabled={!details.city}
                value={user.city}
              >
                {cities.map((city) => (
                  <option
                    onChange={handleInput}
                    key={city} value={city} >
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex flex-row gap-4 items-center'>
            <div className='flex items-center justify-center'>
              <button type='button' onClick={() => toggleEdit('address')} className={`${details.address ? 'bg-red-100 text-red-900' : 'bg-gray-100 text-gray-500'} py-2 px-2 hover:bg-gray-200 hover:text-gray-600 active:scale-105 rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </button>
            </div>
            <div className={`flex flex-col px-2 py-1.5 ${details.address ? "" : "border-2 rounded-md shadow-sm"}`}>
              <label htmlFor="address">Address</label>
              <input
                className={`${details.address ? 'border-gray-200 shadow-sm text-sm' : 'border-none bg-transparent text-gray-600'} duration-400 transition rounded-lg h-10 w-96`}
                onChange={handleInput}
                type="text" value={user.address} name="address" id="address" placeholder='Prese HQ'
                disabled={!details.address} />
            </div>
          </div>
          <div className='flex items-center justify-center'>
            {inputErrorList && (
              <div class="flex p-4 text-sm text-red-600 rounded-lg bg-red-50" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Danger</span>
                <div className=''>
                  <span class="font-medium">Ensure that these requirements are met:</span>
                  <ul class="mt-1.5 ml-4 list-disc list-inside">
                    {inputErrorList.name && <li dangerouslySetInnerHTML={{ __html: inputErrorList.name }}></li>}
                    {inputErrorList.email && <li dangerouslySetInnerHTML={{ __html: inputErrorList.email }}></li>}
                    {inputErrorList.city && <li dangerouslySetInnerHTML={{ __html: inputErrorList.city }}></li>}
                    {inputErrorList.address && <li dangerouslySetInnerHTML={{ __html: inputErrorList.address }}></li>}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className='flex justify-center items-center'>
            <button type='submit' className='bg-red-100 hover:scale-105 active:scale-100 active:cursor-wait transition hover:bg-red-200 mt-4 text-red-900 text-xl py-2 px-6 rounded-sm'>Update Profile</button>
          </div>
        </form>
      </div>
    </div>
  )
}
