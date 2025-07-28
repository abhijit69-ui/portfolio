import { motion } from 'framer-motion';
import { WebBrowser } from './Icons';
import Image from 'next/image';
import {
  htmlIcon,
  cssIcon,
  javaScriptIcon,
  reactIcon,
  nextIcon,
  sassIcon,
  tailwindIcon,
  gitIcon,
  mongoIcon,
  typeScriptIcon,
  goIcon,
} from '@/assets/skillicon';

import type { StaticImageData } from 'next/image';

interface Props {
  icon: string | StaticImageData;
  x: string;
  y: string;
}

const Skill = ({ icon, x, y }: Props) => {
  return (
    <motion.div
      className='flex items-center justify-center absolute cursor-pointer
      '
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: { duration: 1.5 } }}
      viewport={{ once: true }}
    >
      <Image
        src={icon}
        alt='skill-icon'
        className='w-[40px] h-[40px] md:w-[30px] md:h-[30px] sm:w-[25px] sm:h-[25px]'
      />
    </motion.div>
  );
};

const Skills = () => {
  return (
    <>
      <h2 className='font-bold text-8xl mt-64 w-full text-center md:text-6xl md:mt-32'>
        Tech Stack
      </h2>
      <div
        className='w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark
      lg:h-[80vh] sm:h-[60vh] xs:h-[50vh]
      lg:bg-circularLightLg lg:dark:bg-circularDarkLg
      md:bg-circularLightMd md:dark:bg-circularDarkMd
      sm:bg-circularLightSm sm:dark:bg-circularDarkSm
      '
      >
        <motion.div
          className='flex flex-col items-center justify-center rounded-full shadow-dark cursor-pointer'
          whileHover={{ scale: 1.05 }}
        >
          <WebBrowser className='md:w-[55px] md:h-[55px] sm:w-[32px] sm:h-[32px]' />
          <span className='inline-block font-semibold md:text-xs sm:text-[10px]'>
            WWW
          </span>
        </motion.div>
        <Skill icon={htmlIcon} x='-20vw' y='2vw' />
        <Skill icon={cssIcon} x='-5vw' y='-11vw' />
        <Skill icon={javaScriptIcon} x='23vw' y='6vw' />
        <Skill icon={reactIcon} x='0vw' y='11.3vw' />
        <Skill icon={nextIcon} x='-21vw' y='-16vw' />
        <Skill icon={sassIcon} x='14vw' y='-12vw' />
        <Skill icon={tailwindIcon} x='29.5vw' y='-5vw' />
        <Skill icon={gitIcon} x='0vw' y='-20vw' />
        <Skill icon={mongoIcon} x='-29vw' y='15vw' />
        <Skill icon={typeScriptIcon} x='21vw' y='16vw' />
        <Skill icon={goIcon} x='-41vw' y='1vw' />
      </div>
    </>
  );
};

export default Skills;
