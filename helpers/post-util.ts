import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles() {
  return fs.readdirSync(postDirectory);
}

export function getPostData(fileIdentifier: string) {
  const postSlug = fileIdentifier.replace(/\.md$/, '');
  const filePath = path.join(postDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };
  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();
  const allPosts = postFiles.map((post) => getPostData(post));
  const sortedPosts = allPosts.sort((postA: any, postB: any) =>
    postA.date > postB.date ? -1 : 1
  );
  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const feturedPosts = allPosts.filter((post: any) => post.isFeatured);
  return feturedPosts;
}
