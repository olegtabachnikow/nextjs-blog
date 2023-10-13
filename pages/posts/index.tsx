import { FC } from 'react';
import { getAllPosts } from '@/helpers/post-util';
import AllPosts from '@/components/posts/AllPosts';
import Head from 'next/head';

interface Props {
  posts: any;
}

const AllPostsPage: FC<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts'
        />
      </Head>
      <AllPosts posts={posts} />;
    </>
  );
};

export default AllPostsPage;

export function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
    revalidate: 600,
  };
}
