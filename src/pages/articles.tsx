import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';
import useArticles from '@/hooks/useArticles';
import TransitionEffect from '@/components/TransitionEffect';
import type { Article as ArticleProps } from '@/types/article';

const FramerImage = motion(Image);

interface HoverArticleProps {
  title: string;
  cover_image: string | StaticImageData;
  url: string;
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
      className='relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light'
    >
      <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light' />
      <Link
        href={url}
        target='_blank'
        rel='noopener noreferrer'
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
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
          loading='lazy'
        />
      </Link>
      <Link href={url} target='_blank'>
        <h2 className='capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg'>
          {title}
        </h2>
      </Link>
      <p className='text-sm mb-2'>{description}</p>
      <span className='text-primary font-semibold dark:text-primaryDark'>
        {readable_publish_date}
      </span>
    </li>
  );
};

const Article = ({
  id,
  cover_image,
  title,
  readable_publish_date,
  url,
}: ArticleProps) => {
  return (
    <motion.li
      key={id}
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      viewport={{ once: true }}
      className='relative w-full p-4 py-6 my-4 rounded-xl flex items-center justify-between bg-light text-dark first:mt-0 
    border border-solid border-dark border-r-4 border-b-4 dark:border-light dark:bg-dark dark:text-light
    sm:flex-col
    '
    >
      <HoverImage title={title} cover_image={cover_image} url={url} />
      <span
        className='text-primary font-semibold pl-4 dark:text-primaryDark sm:self-start sm:pl-0
      xs:text-sm
      '
      >
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
      rel='noopener noreferrer'
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
        className='z-10 w-96 h-auto hidden absolute rounded-lg md:!hidden'
        loading='lazy'
      />
    </Link>
  );
};

const Articles = () => {
  const loadMoreRef = useRef<HTMLButtonElement | null>(null);

  const { articles, initialLoading, isFetchingMore, hasMore, fetchArticles, page, error } = useArticles();

  const loadMore = () => {
    fetchArticles(page + 1, () => {
      setTimeout(() => {
        loadMoreRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    });
  };

  // Infinite scroll: auto-load when Load More button enters viewport
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const buttonEl = loadMoreRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        if (!hasMore || isFetchingMore || initialLoading) return;
        fetchArticles(page + 1);
      },
      { root: null, rootMargin: '200px', threshold: 0.1 }
    );

    observer.observe(buttonEl);

    return () => {
      observer.unobserve(buttonEl);
      observer.disconnect();
    };
  }, [hasMore, isFetchingMore, initialLoading, fetchArticles, page]);

  if (initialLoading) {
    return (
      <p className='font-semibold text-2xl italic dark:text-light'>
        Loading articles...
      </p>
    );
  }

  // Initial failure state
  if (!initialLoading && articles.length === 0 && error) {
    return (
      <main className='w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light'>
        <Layout className='pt-16'>
          <p className='text-center my-4 text-red-600 dark:text-red-400 font-semibold'>
            Failed to load articles: {error}
          </p>
          <button
            type='button'
            onClick={() => fetchArticles(1)}
            className='mt-4 px-6 py-2 bg-dark text-light rounded-lg sm:text-sm font-semibold dark:bg-light dark:text-dark'
          >
            Retry
          </button>
        </Layout>
      </main>
    );
  }

  // Get top 2 articles by public_reaction_count
  const topTwoArticles = [...articles]
    .sort(
      (a, b) => (b.public_reaction_count ?? 0) - (a.public_reaction_count ?? 0)
    )
    .slice(0, 2);

  // Remaining Articles
  const remainingArticles = articles.filter(
    (article) => !topTwoArticles.find((top) => top.id === article.id)
  );

  return (
    <>
      <Head>
        <title>Articles by Abhijit Nath | Web Dev Insights</title>
        <meta
          name='description'
          content='Read articles and blog posts written by Abhijit Nath on frontend development, JavaScript, React, and more.'
        />
        <meta
          name='keywords'
          content='Abhijit Nath blog, web dev articles, frontend tutorials, React posts'
        />
        <meta
          property='og:title'
          content='Articles by Abhijit Nath | Web Dev Insights'
        />
        <meta
          property='og:description'
          content='Frontend development articles by Abhijit Nath covering React, JavaScript, and developer experiences.'
        />
      </Head>

      <TransitionEffect />
      <main className='w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light'>
        <Layout className='pt-16'>
          <AnimatedText
            text='Where knowledge is cast and shared'
            className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl'
          />

          {error && articles.length > 0 && (
            <p className='text-center my-4 text-red-600 dark:text-red-400 font-semibold'>
              Something went wrong while fetching more articles: {error}
            </p>
          )}

          <ul className='grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16'>
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
            {remainingArticles.map((article) => (
              <Article
                key={article.id}
                id={article.id}
                title={article.title}
                cover_image={article.cover_image}
                readable_publish_date={article.readable_publish_date}
                url={article.url}
              />
            ))}
            {isFetchingMore && (
              <p className='text-center my-4 italic'>
                Loading more articles...
              </p>
            )}
          </ul>

          {hasMore && (
            <motion.button
              initial={{ y: 100, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.5, ease: 'easeInOut' },
              }}
              viewport={{ once: true, amount: 0.2 }}
              type='button'
              ref={loadMoreRef}
              onClick={(e) => {
                e.preventDefault();
                loadMore();
              }}
              className='mt-10 mb-24 px-6 py-2 bg-dark text-light rounded-lg block mx-auto sm:text-sm font-semibold
              dark:bg-light dark:text-dark
              '
              disabled={isFetchingMore}
              aria-busy={isFetchingMore}
              aria-label='Load more articles'
            >
              {isFetchingMore ? 'Loading...' : 'Load More'}
            </motion.button>
          )}
        </Layout>
      </main>
    </>
  );
};

export default Articles;
