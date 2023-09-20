import React from 'react'

export default function ProductCard(item) {
    return (
        <div key={item.id} className=" cursor-wait animate-pulse shadow-md bg-white rounded-sm">
            <div className='flex items-center justify-center w-full'>
                <div className="flex items-center justify-center w-80 h-80 bg-red-100 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-red-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                </div>
            </div>
            <div className="px-1.5 py-2">
                <div className="h-2.5 bg-gray-300 rounded-full w-48 mt-4"></div>
                <div className="flex items-center justify-between">
                    <div className="h-3.5 bg-gray-200 rounded-full w-40 "></div>
                    <div className="text-red-800 bg-red-100 font-medium rounded-sm text-sm duration-100 px-2 py-4 text-center transition">Add to Cart</div>
                </div>
            </div>
        </div>
    )
}
