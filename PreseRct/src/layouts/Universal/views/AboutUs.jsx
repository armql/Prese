const features = [
    { name: 'Origin', description: 'Made by our expert chefs in our kitchen🧑‍🍳' },
    { name: 'Ingredients', description: '100% beef patty, lettuce, tomato, onion, pickles, cheese, ketchup, mustard, and mayo😃' },
    { name: 'Size', description: 'Humongous🍔' },
    { name: 'Cooking Method', description: 'Grilled to perfection🌶️' },
    { name: 'Serving', description: 'Served with a side of crispy fries and a drink🍟🥤' },
    { name: 'Considerations', description: 'Made with fresh, high-quality ingredients. May contain allergens.🍅' },
];

import Dalton from '../images/dalton.jpg'
import dBurger from '../images/displayburger.jpg'
import Burger from '../images/burger.jpg'
import Vegetable from '../images/vegetablesdisplay.jpg'
import PublicStats from '../components/PublicStats';

export default function AboutUs() {
    return (
        <div className='parent'>
            <div className="flex flex-wrap justify-center gap-10 py-14 px-14 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
            <PublicStats />
                <div className="bg-white rounded shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-95">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Dalton's Secret Recipe😉</h2>
                            <p className="mt-4 text-gray-500">
                                Our hamburger is a delicious combination of a 100% beef patty, lettuce, tomato, onion, pickles, cheese, ketchup, mustard, and mayo, served on a soft bun. It's cooked to perfection and comes with a side of crispy fries and a drink. Bite into our juicy patty and savor the flavors of our fresh toppings. Perfect for a quick and satisfying meal on-the-go!</p>
                            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                                {features.map((feature) => (
                                    <div key={feature.name} className="border-t border-gray-200 pt-4">
                                        <dt className="font-medium text-gray-900">{feature.name}</dt>
                                        <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                            <img
                                src={Dalton}
                                alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                                className="rounded-lg bg-gray-100"
                            />
                            <img
                                src={dBurger}
                                alt="Top down view of walnut card tray with embedded magnets and card groove."
                                className="rounded-lg bg-gray-100"
                            />
                            <img
                                src={Burger}
                                alt="Side of walnut card tray with card groove and recessed card area."
                                className="rounded-lg bg-gray-100"
                            />
                            <img
                                src={Vegetable}
                                alt="Walnut card tray filled with cards and card angled in dedicated groove."
                                className="rounded-lg bg-gray-100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
