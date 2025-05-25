import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SquigglyLines from '../components/SquigglyLines';
import { Testimonials } from '../components/Testimonials';

const Home: NextPage = () => {
  return (
    <div className='flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen'>
      <Head>
        <title>Face Photo Restorer</title>
      </Head>
      <Header />
      <main className='flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20'>
        <h1 className='mx-auto max-w-4xl font-display text-6xl font-extrabold tracking-tight text-slate-900 sm:text-7xl md:text-8xl'>
          AI-POWERED PHOTO RESTORATION.
        </h1>

        <p className='mx-auto mt-10 max-w-xl text-xl text-slate-600 leading-relaxed md:text-2xl'>
          Revitalize your old, blurry face photos with our free AI restoration tool. Bring your memories back to life.
        </p>
        <div className='flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 mt-12'>
          <Link
            className='bg-black text-white font-bold py-3 px-8 uppercase tracking-wider rounded-sm hover:bg-gray-800 transition duration-150 ease-in-out text-lg sm:text-base'
            href='/restore'
          >
            Restore your photos
          </Link>
          <a
            className='text-slate-500 hover:text-slate-700 underline sm:mt-0'
            href='https://www.roomgpt.io/'
            target='_blank'
            rel='noreferrer'
          >
            Check out roomGPT
          </a>
        </div>
        <div className='w-full max-w-5xl mx-auto mt-16 sm:mt-24'>
          <div className='flex flex-col sm:flex-row justify-center items-start gap-8 sm:gap-6 md:gap-10'>
            <div className='flex-1 text-center'>
              <h2 className='text-2xl font-bold text-slate-800 mb-4'>
                Original Photo
              </h2>
              <Image
                alt='Original photo of a man'
                src='/michael.jpg'
                className='border border-gray-200 shadow-sm w-full h-auto max-w-[400px] mx-auto'
                width={400}
                height={400}
              />
            </div>
            <div className='flex-1 text-center mt-8 sm:mt-0'>
              <h2 className='text-2xl font-bold text-slate-800 mb-4'>
                Restored Photo
              </h2>
              <Image
                alt='Restored photo of a man'
                width={400}
                height={400}
                src='/michael-new.jpg'
                className='border border-gray-200 shadow-sm w-full h-auto max-w-[400px] mx-auto'
              />
            </div>
          </div>
        </div>
      </main>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
