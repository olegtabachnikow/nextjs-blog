import { FC } from 'react';
import classes from './Hero.module.css';
import Image from 'next/image';

const Hero: FC = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={'/images/site/me.jpeg'}
          alt='picture of me'
          width={300}
          height={300}
        />
      </div>
      <h1>{"Hi, I'm Oleg"}</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        Angular or React
      </p>
    </section>
  );
};

export default Hero;
