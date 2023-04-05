import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getAllPosts } from "~/api/blog.server";
import Post from "~/components/post";
import styles from "~/styles/blog.css";

export const meta = () => {
  return [
    { title: `GuitarLA - Nuestro blog"}` },
    {
      description: `Guitarras, blog de música y venta de guitarras`,
    },
  ];
};

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export const loader = async () => {
  return await getAllPosts();
};

const Blog = () => {
  const posts = useLoaderData();
  return (
    <main className="contenedor">
      <h2 className="heading">Blog</h2>
      <div className="blog">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default Blog;
