import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='text-center w-full py-6 border-t mt-8'>
      <p className='text-gray-600 text-sm'>
        Created by{' '}
        <a
          href='https://www.twitter.com/nutlope'
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium' // Removed hover:text-black and transition, will inherit from globals.css
        >
          Hassan
        </a>{' '}
        (hassan@hey.com).
      </p>
      <div className='mt-2'>
        <Link
          href='https://github.com/Nutlope/restorePhotos'
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm' // Removed text-gray-500, hover:text-black and transition, will inherit from globals.css
        >
          View on GitHub
        </Link>
      </div>
    </footer>
  );
}
