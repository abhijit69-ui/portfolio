import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import wizardPic from '../../public/images/profile/wizard.png';
import AnimatedText from '@/components/AnimatedText';
import Link from 'next/link';
import { ExternalLink } from '@/components/Icons';
import HireMe from '@/components/HireMe';
import potionPod from '../../public/images/potionpod.png';
import TransitionEffect from '@/components/TransitionEffect';

export default function Home() {
  return (
    <>
      <Head>
        <title>Abhijit Nath | Frontend Developer Portfolio</title>
        <meta
          name='description'
          content='Abhijit Nath is a frontend developer specializing in modern web development using React, Tailwind CSS, and TypeScript. Explore projects, articles, and more.'
        />
        <meta
          name='keywords'
          content='Abhijit Nath, frontend developer, portfolio, web developer, React, Tailwind CSS, TypeScript'
        />
        <meta name='author' content='Abhijit Nath' />
        <meta
          property='og:title'
          content='Abhijit Nath | Frontend Developer Portfolio'
        />
        <meta
          property='og:description'
          content='Explore the personal portfolio of Abhijit Nath featuring projects, blogs, and skills in modern frontend development.'
        />
        <meta property='og:type' content='website' />
      </Head>

      <TransitionEffect />
      <main className='flex items-center text-dark w-full min-h-screen dark:text-light'>
        <Layout className='pt-0 md:pt-16 sm:pt-8'>
          <div className='flex items-center justify-between w-full lg:flex-col'>
            <div className='w-1/2 md:w-[77%]'>
              <Image
                src={wizardPic}
                alt='Abijit'
                className='w-[74%] h-auto lg:hidden md:inline-block md:w-full'
                priority
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
              />
            </div>
            <div className='w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center'>
              <AnimatedText
                text='Building modern web experiences with code and design.'
                className='!text-6xl !text-left 
                xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl
                '
              />
              <p className='my-4 text-base font-medium md:my-1 md:text-sm sm:text-xs'>
                I design and develop websites using modern tools like React and
                TypeScript. My portfolio showcases what I build — and how I grow
                with each project.
              </p>
              <div className='flex items-center self-start mt-2 lg:self-center'>
                <Link
                  href='/abijitnath-resume.pdf'
                  target={'_blank'}
                  // download={true}
                  className='flex items-center bg-dark text-light p-2.5 px-6 
                  rounded-lg text-lg font-semibold hover:bg-light hover:text-dark
                  border-2 border-solid border-transparent hover:border-dark
                  dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light
                  hover:dark:border-light
                  md:p-2 md:px-4 md:text-base
                  '
                >
                  Resume <ExternalLink className='w-6 ml-1' />
                </Link>
                <Link
                  href='https://mail.google.com/mail/?view=cm&fs=1&to=abhijitnath100th@gmail.com'
                  target={'_blank'}
                  className='ml-4 text-lg font-medium capitalize text-dark underline dark:text-light
                  md:text-base
                  '
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Layout>

        <HireMe />

        <div className='absolute right-8 bottom-8 inline-block w-36 md:hidden'>
          <Image src={potionPod} alt='abijit' className='w-full h-auto' />
        </div>
      </main>
    </>
  );
}
