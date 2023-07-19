import React, { useEffect, useState } from 'react'

const data = [
    {
        header: "<h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Embrace the <mark class='animate-pulse px-2 text-white bg-red-600 rounded dark:bg-red-500'>Chaos of Managing Food</mark> at the hottest time</h1>",
        paragraph:
            "<p className='text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>Welcome to our food delivery management app, where we specialize in serving a plateful of dark humor alongside your managerial responsibilities. Brace yourself for the rollercoaster ride of juggling driver schedules, resolving customer complaints, and surviving the labyrinthine streets. Embrace the chaos, because managing food delivery is where order meets disorder!</p>",
    },
    {
        header: "<h1 class='mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl'><span class='text-transparent bg-clip-text bg-gradient-to-r to-red-400 animate-pulse from-red-800'>Survive the Gauntlet</span> of Hungry Drivers.</h1>",
        paragraph:
            "<p class='text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>Welcome to our food delivery management app, where your survival skills will be put to the test against the most hungry drivers in town. Brace yourself for the relentless demands for more orders, complaints about wrong addresses, and the eternal struggle of finding available parking spaces. It's a battle out there, but with a sprinkle of dark humor, you'll come out as the ultimate manager!</p>"
    },
    {
        header: "<h1 class='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Enter the <span class='underline underline-offset-3 decoration-8 animate-pulse decoration-red-400 dark:decoration-red-600'>Twilight Zone</span> of Food Delivery Management</h1>",
        paragraph:
            "<p class='text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>Step into a dimension where time flies faster than a pizza delivery scooter, addresses magically change upon arrival, and the orders vanish into thin air. Our food delivery management app is a thrilling adventure filled with unexpected twists and turns. But fear not, for our dark humor will guide you through this enigmatic journey, ensuring you come out with hilarious stories to tell!</p>"
    },
    {
        header: "<h1 class='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Unlock the Secrets of <span class='text-red-600 animate-pulse dark:text-red-500'>Food Delivery Mayhem</span> CRM.</h1>",
        paragraph:
            "<p class='text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>Unravel the mysteries of food delivery chaos with our management app. As you navigate through the labyrinthine challenges of handling orders, optimizing routes, and ensuring customer satisfaction, our dark humor will be your guiding light. Prepare to unlock the secrets of the culinary universe, one delivery at a time!</p>"
    },
    {
        header: "<h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Dive into the <mark class='animate-pulse px-2 text-white bg-red-600 rounded dark:bg-red-500'>Abyss of Delivery</mark> Insanity</h1>",
        paragraph:
            "<p className='text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>Join us on a deep dive into the depths of food delivery insanity. As you plunge into the abyss of managing long shifts, deciphering cryptic customer instructions, and resolving conflicts among drivers, our dark humor will be your lifeline. Embrace the madness and come out with an endless supply of hilarious stories to share during office meetings!</p>",
    },
];


export default function ManagerValidation_skeleton() {
    const [randomMessage, setRandomMessage] = useState(null);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectedMessage = data[randomIndex];
        setRandomMessage(selectedMessage);
    }, []);

    return (
        <div className='flex justify-center items-center bg-white rounded-md shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-90'>
            <title>GFC | Authenticating</title>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                    <div className="mt-10  gap-x-6">
                        {randomMessage && (
                            <>
                                <div
                                    className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
                                    dangerouslySetInnerHTML={{ __html: randomMessage.header }}
                                />
                                <div
                                    className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
                                    dangerouslySetInnerHTML={{ __html: randomMessage.paragraph }}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
