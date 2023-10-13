import { FC } from 'react';
import Image from 'next/image';
import classes from './Logo.module.css';

const Logo: FC = () => {
  return (
    <div className={classes.logo}>
      <Image src='/images/site/logo.png' alt='my logo' width={50} height={50} />
    </div>
  );
};

export default Logo;
