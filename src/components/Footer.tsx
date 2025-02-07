import { memo } from 'react';

// src/components/common/Footer.tsx
const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-lg font-bold mb-4'>About Us</h3>
            <p className='text-gray-400'>
              Leading the innovation in smart wearable technology since 2020.
            </p>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2 text-gray-400'>
              {['Products', 'Features', 'Reviews', 'Support'].map((link) => (
                <li key={link}>
                  <a href='#' className='hover:text-white transition-colors'>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-4'>Contact</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>support@smartwatch.com</li>
              <li>1-800-SMART-WATCH</li>
              <li>123 Tech Street, SF, CA</li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-4'>Newsletter</h3>
            <form className='flex gap-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button
                className='px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors'
                type='submit'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>
            &copy; {new Date().getFullYear()} Smartwatch Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
