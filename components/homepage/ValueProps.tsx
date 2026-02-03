'use client'

export function ValueProps() {
  const valueProps = [
    {
      title: 'Zero Commissions',
      description: 'Freelancers receive 100% of their rate. No monthly fees, no commission, none at all.',
    },
    {
      title: 'Transparent Rates',
      description: 'Fair, sustainable pricing built on cost of living and healthy work frequency. Know exactly what you get.',
    },
    {
      title: 'Unrivalled Support',
      description: 'Access to partnerships, resources, and benefits across Mind, Movement, Money & Mastery.',
    },
    {
      title: 'Welfare First',
      description: 'We prioritize work-life balance and sustainable practices. Your wellbeing matters.',
    },
  ]

  return (
    <section className="section-primary">
      <div className="max-w-content-wide mx-auto">
        <h2 className="heading-display text-display-md mb-16 text-center">
          Why Choose<br />Human Creative
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {valueProps.map((prop, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="text-h4 font-bold mb-4">
                {prop.title}
              </h3>
              <p className="prose-body font-medium text-black leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
