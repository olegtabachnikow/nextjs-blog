import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import classes from './PostItem.module.css';

export interface PostItemType {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
}

interface Props {
  post: PostItemType;
}

const PostItem: FC<Props> = ({ post }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const linkPath = `/posts/${post.slug}`;
  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <div className={classes.image}>
          <Image
            src={imagePath}
            alt={post.title}
            width={300}
            height={200}
            layout='responsive'
          />
        </div>
        <div className={classes.content}>
          <h3>{post.title}</h3>
          <time>{formattedDate}</time>
          <p>{post.excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
