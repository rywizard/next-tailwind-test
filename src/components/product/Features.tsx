import React from 'react';

const Features = () => {
  const features = [
    {
      title: 'Advanced Health Tracking',
      description: '24/7 heart rate, sleep analysis, and stress monitoring',
      icon: '❤️',
    },
    {
      title: '7-Day Battery Life',
      description: 'Long-lasting battery with fast charging capability',
      icon: '🔋',
    },
    {
      title: 'Water Resistant',
      description: '5ATM water resistance for swimming and diving',
      icon: '💧',
    },
    {
      title: 'Smart Notifications',
      description: 'Stay connected with calls, messages, and apps',
      icon: '📱',
    },
  ];

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105'
          >
            <div className='text-5xl mb-4 animate-bounce-slow w-full flex justify-center'>
              {feature.icon}
            </div>
            <h3 className='text-xl font-bold mb-2 text-gray-800 w-full flex justify-center'>
              {feature.title}
            </h3>
            <p className='text-gray-600 w-full flex justify-center'>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
