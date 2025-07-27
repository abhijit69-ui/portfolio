import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import useArticles from '@/hooks/useArticles';
import noImage from '../../public/images/projects/noImage.jpg';

const FramerImage = motion(Image);

interface HoverArticleProps {
  title: string;
  cover_image: string | StaticImageData;
  url: string;
}

export interface ArticleProps {
  id?: number;
  cover_image: string | StaticImageData;
  title: string;
  description?: string;
  url: string;
  readable_publish_date: string;
  public_reaction_count?: number;
}

const FeaturedArticles = ({
  id,
  cover_image,
  title,
  readable_publish_date,
  description,
  url,
}: ArticleProps) => {
  return (
    <li
      id={`article-${id}`}
      className='relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl'
    >
      <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl' />
      <Link
        href={url}
        target='_blank'
        className='w-full inline-block cursor-pointer overflow-hidden rounded-lg'
      >
        <FramerImage
          src={cover_image}
          alt={title}
          width={1000}
          height={450}
          className='w-full h-auto'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
      <Link href={url} target='_blank'>
        <h2 className='capitalize text-2xl font-bold my-2 mt-4 hover:underline'>
          {title}
        </h2>
      </Link>
      <p className='text-sm mb-2'>{description}</p>
      <span className='text-primary font-semibold'>
        {readable_publish_date}
      </span>
    </li>
  );
};

const Article = ({
  cover_image,
  title,
  readable_publish_date,
  url,
}: ArticleProps) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      viewport={{ once: true }}
      className='relative w-full p-4 py-6 my-4 rounded-xl flex items-center justify-between bg-light text-dark first:mt-0 
    border border-solid border-dark border-r-4 border-b-4
    '
    >
      <HoverImage title={title} cover_image={cover_image} url={url} />
      <span className='text-primary font-semibold pl-4'>
        {readable_publish_date}
      </span>
    </motion.li>
  );
};

const HoverImage = ({ title, cover_image, url }: HoverArticleProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (event: React.MouseEvent) => {
    if (imgRef.current) {
      imgRef.current.style.display = 'inline-block';
    }
    x.set(event.pageX);
    y.set(-10);
  };
  const handleMouseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.display = 'none';
    }
    x.set(0);
    y.set(0);
  };

  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <Link
      href={url}
      target='_blank'
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className='capitalize text-xl font-semibold hover:underline'>
        {title}
      </h2>
      <FramerImage
        style={{ x: x, y: y }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
        ref={imgRef}
        src={cover_image}
        alt={title}
        width={1000}
        height={450}
        className='z-10 w-96 h-auto hidden absolute rounded-lg'
      />
    </Link>
  );
};

const Articles = () => {
  const { articles, loading } = useArticles();

  if (loading) {
    return (
      <p className='font-semibold text-2xl italic'>
        Loading featured articles...
      </p>
    );
  }

  // Get top 2 articles by public_reaction_count
  const topTwoArticles = [...articles]
    .sort(
      (a, b) => (b.public_reaction_count ?? 0) - (a.public_reaction_count ?? 0)
    )
    .slice(0, 2);
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
            {topTwoArticles.map((article) => (
              <FeaturedArticles
                key={article.id}
                id={article.id}
                title={article.title}
                cover_image={article.cover_image}
                description={article.description}
                url={article.url}
                readable_publish_date={article.readable_publish_date}
                public_reaction_count={article.public_reaction_count || 0}
              />
            ))}
          </ul>
          <h2 className='font-bold text-4xl w-full text-center my-16 mt-32'>
            All Articles
          </h2>
          <ul>
            <Article
              title='Example title'
              cover_image={noImage}
              readable_publish_date='23 July'
              url='/'
            />
          </ul>
        </Layout>
      </main>
    </>
  );
};

export default Articles;
