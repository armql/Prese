import React from 'react';

export default function QuickAdd() {
    return (
        <div className='grid grid-cols-1 p-4 md:grid-cols-4 gap-2'>
            <div className='col-span-1 p-2 m-2' style={{height: '50px'}}>
                <div className='p-6 px-3 bg-red-500 shadow-sm flex justify-between items-center rounded'>
                    <div>
                        <h3 className='text-2xl font-bold text-white'>Employee+</h3>
                        <p className='text-sm text-white'>You can add your employees here!</p>
                    </div>
                    <button type='button' className='btn-black rounded-md bg-red-50 font-bold py-2 px-4 hover:bg-white shadow-xl'>
                        Employee+
                    </button>
                </div>
            </div>
            <div className='col-span-1 p-2 m-2' style={{height: '50px'}}>
                <div className='p-6 px-3 bg-blue-500 shadow-sm flex justify-between items-center rounded'>
                    <div>
                        <h3 className='text-2xl font-bold text-white'>Driver+</h3>
                        <p className='text-sm text-white'>You can add your Fast Drivers here!</p>
                    </div>
                    <button type='button' className='btn-black rounded-md bg-blue-100 font-bold py-2 px-4 hover:bg-white shadow-xl'>
                        Driver+
                    </button>
                </div>
            </div>
            <div className='col-span-1 p-2 m-2' style={{height: '50px'}}>
                <div className='p-6 px-3 bg-yellow-300 shadow-sm flex justify-between items-center rounded'>
                    <div>
                        <h3 className='text-2xl font-bold text-white'>Product+</h3>
                        <p className='text-sm text-white'>You can add your Products here!</p>
                    </div>
                    <button type='button' className='btn-black rounded-md bg-yellow-100 font-bold py-2 px-4 m-2 hover:bg-white shadow-xl'>
                        Product+
                    </button>
                </div>
            </div>
            <div className='col-span-1 p-2 m-2' style={{height: '50px'}}>
                <div className='p-6 px-3 bg-red-500 shadow-sm flex justify-between items-center rounded'>
                    <div>
                        <h3 className='text-2xl font-bold text-white'>Category+</h3>
                        <p className='text-sm text-white'>You can add your Categories here!</p>
                    </div>
                    <button type='button' className='btn-black rounded-md bg-red-100 font-bold py-2 px-4 hover:bg-white shadow-xl'>
                        Category+
                    </button>
                </div>
            </div>
        </div>
    )
}
