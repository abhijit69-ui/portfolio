import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import LiIcon from './LiIcon';

interface Props {
  title: string;
  subtitile?: string;
  date: string;
  place: string;
  description: string;
}

const Details = ({ title, subtitile, date, place, description }: Props) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between
      md:w-[80%]
      '
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <h3 className='capitalize font-bold text-2xl sm:text-xl xs:text-lg'>
          {title}
        </h3>
        {subtitile && (
          <h4 className='text-lg font-semibold italic mb-1 sm:text-md xs:text-sm text-primary dark:text-primaryDark'>
            {subtitile}
          </h4>
        )}
        <span className='capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm'>
          {date} | {place}
        </span>
        <p className='font-medium w-full md:text-sm'>{description}</p>
      </motion.div>
    </li>
  );
};

const Timeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
    layoutEffect: false,
  });

  return (
    <div className='my-64'>
      <h2 className='font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16'>
        Career Journey
      </h2>

      <div ref={ref} className='w-[75%] mx-auto relative lg:w-[90%] md:w-full'>
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className='absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light
          md:w-[2px] md:left-[30px] xs:left-[20px]
          '
        />

        <ul className='w-full flex flex-col items-start justify-between ml-4 xs:ml-2'>
          <Details
            title='Higher Secondary'
            date='2019-2020'
            place='Pragjyotish College'
            description='Focused on commerce and business fundamentals including accountancy, economics, and business studies.'
          />
          <Details
            title='Bachelor Of Computer Applications'
            date='2020-2023'
            place='Assam DonBosco University'
            description='Relevant coursework included Programming in C/C++, Data Structures, Database Management Systems (SQL/DBMS), 
            Computer Networks, ML and System Design.'
          />
          <Details
            title='Other Professional Experience'
            subtitile='Joined Aviation as Security Officer'
            date='2023-2025'
            place='InterGlobe Aviation LTD - IndiGo GAU'
            description='Certified X-ray screener, responsible for daily security operations of passengers, their Baggages, Cargo and Aircraft.'
          />
          <Details
            title='Self-Learning & Development'
            subtitile='Full-Stack Dev & SaaS Prototyping'
            date='2025-Present'
            place='Online Courses & AI Tools'
            description='Actively learning web development through hands-on projects, interactive coding platforms, 
            and AI-assisted tools. Focus areas include HTML, CSS, JavaScript, React, and modern UI/UX practices.'
          />
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
