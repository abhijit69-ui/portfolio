import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className = '' }: Props) => {
  return (
    <div
      className={`w-full h-full inline-block z-0 bg-light p-32 dark:bg-dark ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
