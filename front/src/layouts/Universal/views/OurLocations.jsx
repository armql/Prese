import React from 'react';

export default function OurLocations() {
  return (
    <div className='w-full bg-white backdrop-filter backdrop-blur-lg bg-opacity-95'>
      <title>Prese | Our Locations</title>
      <div className='grid xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 justify-center p-4'>
        <div className='flex flex-col justify-center'>
          <h2 className='text-2xl font-bold mb-4'>Visit Us</h2>
          <ul className='list-disc ml-6'>
            <li>
              <span className='font-bold'>Location 1:</span> Address 1, City
            </li>
            <li>
              <span className='font-bold'>Location 2:</span> Address 2, City
            </li>
            <li>
              <span className='font-bold'>Location 3:</span> Address 3, City
            </li>
          </ul>
        </div>
        <div className='shadow-md border border-gray-300'>
          <div className='aspect-w-16 aspect-h-9'>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2943.721058841202!2d21.469316176013503!3d42.45495077118429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13548d5a468d30f1%3A0x48866340f0eec3f4!2sKFC%20Gjilan!5e0!3m2!1sen!2s!4v1684459812096!5m2!1sen!2s"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
