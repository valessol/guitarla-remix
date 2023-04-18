import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getAllPosts } from "../api/blog.server";
import { getAllProducts } from "../api/productos.server";
import ProductsList from "../components/productsList";
import PostsList from "../components/postsList";
import Course from "../components/course";
import guitarStyles from "~/styles/productos.css";
import blogStyles from "~/styles/blog.css";
import courseStyles from "~/styles/course.css";

export const meta = () => {
  return [
    { title: `GuitarLA - Remix"}` },
    {
      description: `Guitarras, blog de música y venta de guitarras`,
    },
  ];
};

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: guitarStyles,
    },
    {
      rel: "stylesheet",
      href: blogStyles,
    },
    {
      rel: "stylesheet",
      href: courseStyles,
    },
  ];
};

export const loader = async () => {
  const [guitarras, posts] = await Promise.all([
    getAllProducts(),
    getAllPosts(),
  ]);

  const courseImageUrl = `${process.env.CLOUDINARY_BASE_URL}/v1680290026/GuitarLA/cursos_bg_phjenp.jpg`;
  return {
    guitarras,
    posts,
    courseImageUrl,
  };
};

const Index = () => {
  const { guitarras, posts, courseImageUrl } = useLoaderData();

  return (
    <>
      <main className="contenedor">
        <ProductsList data={guitarras} />
      </main>
      <Course imageUrl={courseImageUrl} />
      <section className="contenedor">
        <PostsList data={posts} />
      </section>
    </>
  );
};

export default Index;
