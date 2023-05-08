import React from 'react';

export default function QuickAdd() {
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='col-span-1 p-2'>
                <div className='p-6 px-3 bg-red-500 shadow-sm flex justify-between items-center rounded'>
                    <div>
                        <h3 className='text-2xl font-bold text-white'>Employee+</h3>
                        <p className='text-sm text-white'>You can add your employees here!</p>
                    </div>
                    <button type='button' className='btn-black bg-white font-bold py-2 px-4'>
                        Employee+
                    </button>
                </div>
            </div>
            <div className='col-span-1 p-2'>
                <div className='p-6 px-3 bg-blue-500 shadow-sm flex justify-between items-center rounded'>
                    <div>
                        <h3 className='text-2xl font-bold text-white'>Driver+</h3>
                        <p className='text-sm text-white'>You can add your Drivers here!</p>
                    </div>
                    <button type='button' className='btn-black bg-white font-bold py-2 px-4'>
                        Driver+
                    </button>
                </div>
            </div>
            <div className='col-span-1 p-2'>
                <div className='p-6 px-3 bg-yellow-300 shadow-sm flex justify-between items-center rounded'>
                    <div>
                        <h3 className='text-2xl font-bold text-white'>Product+</h3>
                        <p className='text-sm text-white'>You can add your Products here!</p>
                    </div>
                    <button type='button' className='btn-black bg-white font-bold py-2 px-4'>
                        Product+
                    </button>
                </div>
            </div>
            <div className='col-span-1 p-2'>
                <div className='p-6 px-3 bg-red-500 shadow-sm flex justify-between items-center rounded'>
                    <div>
                        <h3 className='text-2xl font-bold text-white'>Category+</h3>
                        <p className='text-sm text-white'>You can add your Categories here!</p>
                    </div>
                    <button type='button' className='btn-black bg-white font-bold py-2 px-4'>
                        Category+
                    </button>
                </div>
            </div>
        </div>
    )
}
