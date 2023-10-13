import { FC } from 'react';
import classes from './PostsGrid.module.css';
import PostItem, { PostItemType } from './PostItem';

interface Props {
  posts: PostItemType[];
}

const PostsGrid: FC<Props> = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostsGrid;
