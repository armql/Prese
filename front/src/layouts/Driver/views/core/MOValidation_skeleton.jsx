import React, { useEffect, useState } from "react";

const data = [
  {
    header:
      "<h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>Embrace the <mark class='animate-pulse px-2 text-white bg-red-600 rounded'>Chaos of Food</mark> at the hottest time</h1>",
    paragraph:
      "<p className='text-lg font-normal text-gray-500 lg:text-xl'>Here at GFC, we specialize in delivering food with a touch of dark humor. We understand the trials and tribulations of waiting for your meal, especially when you're part of the delivery team. But fear not, for our unique brand of comedy will keep you entertained as you wait for your next order to come in.</p>",
  },
  {
    header:
      "<h1 class='mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl'><span class='text-transparent bg-clip-text bg-gradient-to-r to-red-400 animate-pulse from-red-800'>Survive the Gauntlet</span> of Hungry Customers.</h1>",
    paragraph:
      "<p class='text-lg font-normal text-gray-500 lg:text-xl'>Welcome to our food delivery service, where we test your endurance against the most ravenous appetites. Brace yourself for the chaotic frenzy of orders and the never-ending hunger of our customers. It's a battle out there, but with a sprinkle of dark humor, you'll come out victorious!</p>",
  },
  {
    header:
      "<h1 class='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>Enter the <span class='underline underline-offset-3 decoration-8 animate-pulse decoration-red-400'>Twilight Zone</span> of Food Delivery</h1>",
    paragraph:
      "<p class='text-lg font-normal text-gray-500 lg:text-xl'>Step into a dimension where time slows down, addresses become unfindable, and orders mysteriously vanish. Our food delivery service is a thrilling adventure filled with unexpected twists and turns. But fear not, for our dark humor will guide you through this enigmatic journey.</p>",
  },
  {
    header:
      "<h1 class='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>Unlock the Secrets of <span class='text-red-600 animate-pulse'>Food Delivery Mayhem</span> CRM.</h1>",
    paragraph:
      "<p class='text-lg font-normal text-gray-500 lg:text-xl'>Unravel the mysteries of food delivery chaos with us. As you navigate through the labyrinthine streets, battle traffic, and encounter unique customer requests, our dark humor will be your guiding light. Prepare to unlock the secrets of the culinary universe!</p>",
  },
  {
    header:
      "<h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>Dive into the <mark class='animate-pulse px-2 text-white bg-red-600 rounded'>Abyss of Delivery</mark> Insanity</h1>",
    paragraph:
      "<p className='Join us on a rollercoaster ride into the depths of food delivery insanity. As you plunge into the abyss of long shifts, wrong addresses, and quirky customer interactions, our dark humor will be your lifeline. Embrace the madness and come out with stories to tell!</p>",
  },
];

export default function MOValidation_skeleton() {
  const [randomMessage, setRandomMessage] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const selectedMessage = data[randomIndex];
    setRandomMessage(selectedMessage);
  }, []);

  return (
    <div className="flex justify-center items-center bg-white rounded-md shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-90">
      <title>Prese | Authenticating</title>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <div className="mt-10  gap-x-6">
            {randomMessage && (
              <>
                <div
                  className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
                  dangerouslySetInnerHTML={{ __html: randomMessage.header }}
                />
                <div
                  className="text-lg font-normal text-gray-500 lg:text-xl"
                  dangerouslySetInnerHTML={{ __html: randomMessage.paragraph }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
