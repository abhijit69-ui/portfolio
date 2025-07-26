import Link from 'next/link';
import Layout from './Layout';

const Footer = () => {
  return (
    <footer className='w-full border-t-2 border-solid border-dark font-medium text-lg'>
      <Layout className='py-8 flex items-center justify-between'>
        <span>{new Date().getFullYear()} &copy; All Rights Reserved</span>
        <div className='flex items-center'>
          Made with <span className='text-primary text-2xl px-1'>&#9825;</span>
          by&nbsp;
          <Link href='/' className='hover:underline hover:underline-offset-2'>
            Abijit
          </Link>
        </div>
        <Link
          href='https://mail.google.com/mail/?view=cm&fs=1&to=abhijitnath1a1@gmail.com'
          target={'_blank'}
          className='hover:underline hover:underline-offset-2'
        >
          Say Hello!
        </Link>
      </Layout>
    </footer>
  );
};

export default Footer;
