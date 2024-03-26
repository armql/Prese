const stats = [
    { id: 1, name: 'Orders every 24 hours', value: '#120' },
    { id: 2, name: 'locations and growing', value: '60 nGFC' },
    { id: 3, name: 'New users annually', value: '4,500' },
  ]
  
  export default function PublicStats() {
    return (
      <div className="py-10 px-6 rounded shadow-xl bg-white backdrop-filter backdrop-blur-lg bg-opacity-90">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
          <dl className="grid grid-cols-1 gap-x-8  gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto  flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-red-300">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-red-700 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    )
  }