import React from 'react'

export default function MOLoadingModal_skeleton() {

    return (
        <div
            id="drawer-swipe"
            className=" fixed z-40 w-full overflow-y-auto max-h-screen bg-white border-t-2 border-gray-300 dark:border-gray-700 transition-transform bottom-0 top-90 left-0 right-0"
            tabIndex="-1"
            aria-labelledby="drawer-swipe-label"
        >
            <div className="flex justify-between px-4 py-3">
                <h5
                    className="text-sm font-semibold text-gray-600 cursor-pointer dark:text-gray-400"
                >
                    Close
                </h5>
                <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Order Details
                </h5>
                <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    &nbsp;
                </h5>
            </div>
            <div
                className="px-4 py-6 grid gap-2 sm:grid-cols-1 md-grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                <div className="grid grid-cols-2 gap-2 animate-pulse">
                    <div className="grid grid-cols-1 border-y-2 gap-2 p-4 border-l-2 items-center">
                        <div className='flex items-center justify-center w-full'>
                            <div class="flex items-center justify-center w-40 h-40 bg-gray-300 rounded dark:bg-gray-700">
                                <svg class="w-8 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                            </div>
                        </div>
                        <div class="w-full">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-10 border-y-2 border-r-2 p-4">
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                <div class="h-2.5 bg-gray-300 rounded-full w-14"></div>
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                <div class="h-2.5 bg-gray-300 rounded-full w-14"></div>
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 animate-pulse">
                    <div className="grid grid-cols-1 border-y-2 gap-2 p-4 border-l-2 items-center">
                        <div className='flex items-center justify-center w-full'>
                            <div class="flex items-center justify-center w-40 h-40 bg-gray-300 rounded dark:bg-gray-700">
                                <svg class="w-8 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                            </div>
                        </div>
                        <div class="w-full">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 border-y-2 border-r-2 p-4">
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                <div class="h-2.5 bg-gray-300 rounded-full w-14"></div>
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                <div class="h-2.5 bg-gray-300 rounded-full w-14"></div>
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 animate-pulse">
                    <div className="grid grid-cols-1 border-y-2 gap-2 p-4 border-l-2 items-center">
                        <div className='flex items-center justify-center w-full'>
                            <div class="flex items-center justify-center w-40 h-40 bg-gray-300 rounded dark:bg-gray-700">
                                <svg class="w-8 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                            </div>
                        </div>
                        <div class="w-full">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 border-y-2 border-r-2 p-4">
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                <div class="h-2.5 bg-gray-300 rounded-full w-14"></div>
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                <div class="h-2.5 bg-gray-300 rounded-full w-14"></div>
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 animate-pulse">
                    <div className="grid grid-cols-1 border-y-2 gap-2 p-4 border-l-2 items-center">
                        <h5 className="text-xl font-bold text-gray-800 dark:text-white text-center">
                            <div class="h-3.5 bg-gray-400 rounded-full w-50"></div>
                        </h5>
                        <h3 className="font-bold text-gray-700">
                            <div class="h-2.5 bg-gray-300 rounded-full w-50"></div>
                        </h3>
                        <div className="text-gray-500 bg-gray-100 border-gray-200 p-1 w-full h-40 border-2">
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 border-y-2 border-r-2 p-4">
                        <div className="grid grid-cols-2 items-center">
                            <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                <div class="h-2.5 bg-gray-300 rounded-full w-14"></div>
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                <div class="h-2.5 bg-gray-300 rounded-full w-14"></div>
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                <div class="h-2.5 bg-gray-300 rounded-full w-14"></div>
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                <div class="h-2.5 bg-gray-300 rounded-full w-14"></div>
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
