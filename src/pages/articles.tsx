import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import imgPlaceholder from '../../public/images/projects/noImage.jpg';
import exampleImg from '../../public/images/articles/What is Redux with easy explanation.png';
import { motion } from 'framer-motion';

const FramerImage = motion(Image);

interface Props {
  img: string | StaticImageData;
  title: string;
  date: string;
  summary: string;
  link: string;
}

const FeaturedArticles = ({ img, title, date, summary, link }: Props) => {
  return (
    <li className='relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl'>
      <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl' />
      <Link
        href={link}
        target='_blank'
        className='w-full inline-block cursor-pointer overflow-hidden rounded-lg'
      >
        <FramerImage
          src={img}
          alt={title}
          className='w-full h-auto'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
      <Link href={link} target='_blank'>
        <h2 className='capitalize text-2xl font-bold my-2 mt-4 hover:underline'>
          {title}
        </h2>
      </Link>
      <p className='text-sm mb-2'>{summary}</p>
      <span className='text-primary font-semibold'>{date}</span>
    </li>
  );
};

const articles = () => {
  return (
    <>
      <Head>
        <title>Article Page</title>
        <meta name='description' content='this is the article page' />
      </Head>
      <main className='w-full mb-16 flex flex-col items-center justify-center overflow-hidden'>
        <Layout className='pt-16'>
          <AnimatedText
            text='Where knowledge is cast and shared'
            className='mb-16'
          />
          <ul className='grid grid-cols-2 gap-16'>
            <FeaturedArticles
              img={imgPlaceholder}
              title='Exaple Blog 1'
              summary='this is example summary'
              date='23-07-2025'
              link='/'
            />
            <FeaturedArticles
              img={exampleImg}
              title='Exaple Blog 2'
              summary='this is example summary'
              date='23-07-2025'
              link='/'
            />
          </ul>
          <h2 className='font-bold text-4xl w-full text-center my-16 mt-32'>
            All Articles
          </h2>
        </Layout>
      </main>
    </>
  );
};

export default articles;
