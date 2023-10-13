import { FC } from 'react';
import Hero from '@/components/homepage/Hero';
import FeaturedPosts from '@/components/homepage/FeaturedPosts';
import { getFeaturedPosts } from '@/helpers/post-util';
import Head from 'next/head';

interface Props {
  posts: any;
}

const HomePage: FC<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta
          name='description'
          content='I post about programming and web development'
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export default HomePage;

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 600,
  };
}
