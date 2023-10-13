import PostContent from '@/components/posts/post-detail/PostContent';
import { getPostData, getPostsFiles } from '@/helpers/post-util';
import { GetServerSidePropsContext } from 'next';
import { FC } from 'react';
import Head from 'next/head';

interface Props {
  post: any;
}

const PostDetailPage: FC<Props> = ({ post }) => {
  if (!post) {
    return null;
  }
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content={post.excerpt} />
      </Head>
      <PostContent post={post} />;
    </>
  );
};

export default PostDetailPage;

export function getStaticPaths() {
  const postFilenames = getPostsFiles();
  const slugs = postFilenames.map((filename) => filename.replace(/\.md$/, ''));
  const staticPaths = slugs.map((slug: any) => {
    return {
      params: {
        slug: slug,
      },
    };
  });
  return {
    paths: staticPaths,
    fallback: true,
  };
}

export function getStaticProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const post = getPostData(params?.slug as string);
  return {
    props: { post },
    revalidate: 600,
  };
}
