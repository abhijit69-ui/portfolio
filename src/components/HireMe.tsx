import Link from 'next/link';
import { CircleText } from './Icons';

const HireMe = () => {
  return (
    <div className='fixed left-4, bottom-4 flex items-center justify-center overflow-hidden'>
      <div className='w-40 h-auto flex items-center justify-center relative'>
        <CircleText className='fill-dark animate-spin-slow' />
        <Link
          href='https://mail.google.com/mail/?view=cm&fs=1&to=abhijitnath1a1@gmail.com'
          target={'_blank'}
          className='flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-dark text-light shadow-md border-solid border-dark w-20 h-20 rounded-full font-semibold
          hover:bg-light hover:text-dark'
        >
          Hire Me
        </Link>
      </div>
    </div>
  );
};

export default HireMe;
