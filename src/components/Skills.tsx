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
  mongoICon,
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
      className='flex items-center justify-center absolute cursor-pointer'
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: { duration: 1.5 } }}
      viewport={{ once: true }}
    >
      <Image src={icon} alt='skill-icon' width={40} height={40} />
    </motion.div>
  );
};

const Skills = () => {
  return (
    <>
      <h2 className='font-bold text-8xl mt-64 w-full text-center'>
        Tech Stack
      </h2>
      <div className='w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark'>
        <motion.div
          className='flex flex-col items-center justify-center rounded-full shadow-dark cursor-pointer'
          whileHover={{ scale: 1.05 }}
        >
          <WebBrowser />
          <span className='inline-block font-semibold'>WEB</span>
        </motion.div>
        <Skill icon={htmlIcon} x='-20vw' y='2vw' />
        <Skill icon={cssIcon} x='-5vw' y='-11vw' />
        <Skill icon={javaScriptIcon} x='23vw' y='6vw' />
        <Skill icon={reactIcon} x='0vw' y='11.3vw' />
        <Skill icon={nextIcon} x='-21vw' y='-16vw' />
        <Skill icon={sassIcon} x='14vw' y='-12vw' />
        <Skill icon={tailwindIcon} x='29.5vw' y='-5vw' />
        <Skill icon={gitIcon} x='0vw' y='-20vw' />
        <Skill icon={mongoICon} x='-29vw' y='15vw' />
        <Skill icon={typeScriptIcon} x='21vw' y='16vw' />
        <Skill icon={goIcon} x='-41vw' y='1vw' />
      </div>
    </>
  );
};

export default Skills;
