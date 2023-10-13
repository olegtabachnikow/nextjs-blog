import { FC } from 'react';
import PostHeader from './PostHeader';
import classes from './PostContent.module.css';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { PrismLight as SyntaxHightlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';

SyntaxHightlighter.registerLanguage('javascript', js);

interface Props {
  post: any;
}

const PostContent: FC<Props> = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const customRenderers = {
    code(code: any) {
      const { language, children } = code;
      return (
        <SyntaxHightlighter
          style={atomDark}
          language='javascript'
          // eslint-disable-next-line react/no-children-prop
          children={children}
        />
      );
    },
    p(p: any) {
      const { node } = p;
      if (node.children[0].tagName === 'img') {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{p.children}</p>;
    },
  };
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
