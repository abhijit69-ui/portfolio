import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import profilePic from '../../public/images/profile/profilepic.jpeg';
import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface Props {
  value: number;
  showInfinity?: boolean;
}

const AnimatedNumbers = ({ value, showInfinity }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isInView && !isDone) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue, isDone]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current && !isDone) {
        if (showInfinity && latest.toFixed(0) >= value) {
          ref.current.textContent = '∞';
          setIsDone(true);
        } else {
          ref.current.textContent = latest.toFixed(0);
        }
      }
      if (latest >= value) {
        setIsDone(true);
      }
    });
    return () => unsubscribe();
  }, [springValue, value, showInfinity, isDone]);

  return <span ref={ref}></span>;
};

const about = () => {
  return (
    <>
      <Head>
        <title>Abhijit | About Page</title>
        <meta
          name='description'
          content='this is an about page of dev portfolio'
        />
      </Head>
      <main className='flex w-full flex-col items-center justify-center'>
        <Layout className='pt-16'>
          <AnimatedText
            text='Alchemy of Ideas into Interfaces!'
            className='mb-16'
          />
          <div className='grid w-full grid-cols-8 gap-16'>
            <div className='col-span-3 flex flex-col items-start justify-start'>
              <h2 className='mb-4 text-lg font-bold uppercase text-dark/75'>
                The Story So Far...
              </h2>
              <p className='font-medium'>
                Hi, I&apos;m Abhijit Nath, a full-stack developer with a deep
                passion for building powerful, scalable, and meaningful web
                applications. With a strong foundation in both frontend and
                backend technologies, I enjoy transforming complex problems into
                elegant, user-friendly solutions.
              </p>
              <p className='my-4 font-medium'>
                I believe development is more than just writing code — it&apos;s
                about bringing ideas to life, creating seamless user
                experiences, and building tools that make a difference.
              </p>
              <p className='font-medium'>
                Whether I&apos;m crafting responsive UIs in React, designing
                efficient APIs, or managing databases, I bring curiosity,
                precision, and purpose to every project I take on. I&apos;m
                always excited to collaborate and help turn your vision into
                reality.
              </p>
            </div>

            <div
              className='col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark
            bg-light p-8'
            >
              <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark' />
              <Image
                src={profilePic}
                alt='abijit'
                className='w-full h-auto rounded-2xl'
              />
            </div>

            <div className='col-span-2 flex flex-col items-end justify-between'>
              <div className='flex flex-col items-end justify-center'>
                <span className='inline-block text-7xl font-bold'>
                  <AnimatedNumbers value={299} />+
                </span>
                <h2 className='text-xl font-medium capitalize text-dark/75'>
                  Hours Spent Learning
                </h2>
              </div>
              <div className='flex flex-col items-end justify-center'>
                <span className='inline-block text-7xl font-bold'>
                  <AnimatedNumbers value={12} />+
                </span>
                <h2 className='text-xl font-medium capitalize text-dark/75'>
                  Projects Built
                </h2>
              </div>
              <div className='flex flex-col items-end justify-center'>
                <span className='inline-block text-7xl font-bold'>
                  <AnimatedNumbers value={50} showInfinity />
                </span>
                <h2 className='text-xl font-medium capitalize text-dark/75'>
                  Still Levelling Up...
                </h2>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default about;
