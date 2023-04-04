import React from "react";
import { useLoaderData } from "@remix-run/react";
import Product from "~/components/product";
import styles from "~/styles/guitarras.css";
import { getAllProducts } from "../api/productos.server";

export const meta = () => {
  return [
    { title: "GuitarLA - Tienda" },
    { description: "Nuestra colección de Guitarras" },
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
  return await getAllProducts();
};

const Tienda = () => {
  const data = useLoaderData();

  return (
    <main className="contenedor">
      <h2 className="heading">Guitarras</h2>

      {data?.length && (
        <div className="guitarras-grid">
          {data.map((guitarra) => (
            <Product key={guitarra.url} data={guitarra} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Tienda;
