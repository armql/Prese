import React, { useState } from 'react';
const slideData = [
    {
        imageUrl: '/src/layouts/Universal/images/slider1.jpg',
        title: 'Eat until you pass out!',
        description:
            "We don't judge here. In fact, we encourage you to indulge in our delicious burgers, pizzas, and sushi until you can't move. Who needs a gym membership anyway?",
        linkUrl: '#',
    },
    {
        imageUrl: '/src/layouts/Universal/images/slider2.webp',
        title: 'Our pizza will make you forget your ex!',
        description:
            'Indulge in our mouth-watering selection just the way you like them. Order now and get a free side dish on us!',
        linkUrl: '#',
    },
    {
        imageUrl: '/src/layouts/Universal/images/slider3.jpg',
        title: 'Taco Tuesday just got better!',
        description:
            'Join us every Tuesday for our unbeatable taco deal mixed flavors and enjoy our fresh ingredients and homemade salsas.',
        linkUrl: '#',
    },
    {
        imageUrl: '/src/layouts/Universal/images/slider4.webp',
        title: 'Solution to all your problems!',
        description:
            'Treat yourself to our creamy, delicious ice cream. Order now and get a free scoop with every order!',
        linkUrl: '#',
    },
];

export default function OfferSlider() {
    const [activeSlide, setActiveSlide] = useState(0);

    const handlePrevClick = () => {
        setActiveSlide((activeSlide - 1 + slideData.length) % slideData.length);
    };

    const handleNextClick = () => {
        setActiveSlide((activeSlide + 1) % slideData.length);
    };

    return (
        <div className="py-24 px-14">
            <div className="py-6 px-6 rounded-md bg-transparent ">
                <div id="gallery" className="relative w-full" data-carousel="slide">
                    <div className="relative h-96 shadow-xl overflow-hidden rounded-lg">
                        {slideData.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute top-0 left-0 w-full h-full ${index === activeSlide ? 'opacity-100' : 'opacity-0'}
      duration-700 ease-in-out`}
                                data-carousel-item={index === activeSlide ? 'active' : null}
                            >
                                <img src={slide.imageUrl} className='w-full' alt='' />
                                <div className='absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/80 to-transparent'>
                                    <a href={slide.linkUrl}>
                                        <h5 className='mb-2 text-2xl font-bold tracking-tight text-white'>{slide.title}</h5>
                                    </a>
                                    <p className='mb-3 font-normal text-white'>{slide.description}</p>
                                    <a
                                        href={slide.linkUrl}
                                        className='bg-white/70 hover:bg-white/80 font-bold py-2 px-4 rounded-lg group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'
                                    >
                                        Order Now
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type='button'
                        className='absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
                        data-carousel-prev
                        onClick={handlePrevClick}
                    >
                        <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/80 dark:bg-gray-800/30 group-hover:bg-black/90 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
                            <svg
                                aria-hidden='true'
                                className='w-6 h-6 text-white dark:text-gray-800'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M15 19l-7-7 7-7'
                                ></path>
                            </svg>
                            <span className='sr-only'>Previous</span>
                        </span>
                    </button>
                    <button
                        type='button'
                        className='absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
                        data-carousel-next
                        onClick={handleNextClick}
                    >
                        <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/80 dark:bg-gray-800/30 group-hover:bg-black/90 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
                            <svg
                                aria-hidden='true'
                                className='w-6 h-6 text-white dark:text-gray-800'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M9 5l7 7-7 7'
                                ></path>
                            </svg>
                            <span className='sr-only'>Next</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}
