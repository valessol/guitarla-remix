import { useEffect, useState } from "react";
import { useOutletContext } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import styles from "~/styles/carrito.css";
import CartItem from "../components/cartItem";

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export const meta = () => {
  return [
    { title: "GuitarLA - Carrito de compras" },
    { description: "Venta de guitarras, blog de música" },
  ];
};

const Carrito = () => {
  const [total, setTotal] = useState(0);
  const { cart } = useOutletContext();

  useEffect(() => {
    const newTotal = cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  return (
    <ClientOnly fallback={"Cargando..."}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de compras</h1>
          <div className="contenido">
            <div className="cart">
              <h2>Articulos</h2>
              {!cart.length
                ? "Carrito vacío"
                : cart.map((item) => <CartItem data={item} key={item.id} />)}
            </div>
            <aside className="resume">
              <h3>Resumen del pedido</h3>
              <p>Total a pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
};

export default Carrito;
