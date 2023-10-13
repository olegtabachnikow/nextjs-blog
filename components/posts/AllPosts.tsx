import { FC } from 'react';
import classes from './AllPosts.module.css';
import PostsGrid from './PostsGrid';
import { PostItemType } from './PostItem';

interface Props {
  posts: PostItemType[];
}

const AllPosts: FC<Props> = ({ posts }) => {
  return (
    <section className={classes.posts}>
      <h1>All posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
