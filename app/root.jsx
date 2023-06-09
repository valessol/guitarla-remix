import React, { useEffect, useState } from "react";
import {
  Meta,
  Links,
  Outlet,
  LiveReload,
  Scripts,
  Link,
  useRouteError,
} from "@remix-run/react";
import styles from "~/styles/index.css";
import Header from "~/components/header";
import Footer from "~/components/Footer";

export const meta = () => {
  return [
    { charset: "utf-8" },
    { title: "GuitarLA - Remix" },
    { viewport: "width=device-width,initial-scale=1" },
  ];
};

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

const initialState =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart"))
    : null;
const App = () => {
  const [cart, setCart] = useState(initialState || []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const existItem = cart.some((cartItem) => cartItem.id === item.id);

    if (!cart.length) return setCart([item]);

    const newCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.quantity = item.quantity;
      }
      return cartItem;
    });

    if (existItem) setCart(newCart);
    else setCart([...newCart, item]);
  };

  const deleteFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  return (
    <Document>
      <Outlet context={{ addToCart, cart, deleteFromCart }} />
    </Document>
  );
};

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <LiveReload />

        <Scripts />
      </body>
    </html>
  );
}

/** Manejo de errores */

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <Document>
      <p className="error">
        {error.status} {error.statusText}
      </p>
      <Link className="error-enlace" to="/">
        Volver a la página principal
      </Link>
    </Document>
  );
}

export default App;
