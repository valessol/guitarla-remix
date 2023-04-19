import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getProductById } from "../api/productos.server";
import { useState } from "react";
import Message from "../components/message";

export const loader = async ({ params }) => {
  const { id } = params;
  const data = await getProductById(id);

  return data;
};

export const meta = ({ data }) => {
  return [
    { title: `GuitarLA - ${data ? data.title : "Guitarra no encontrada"}` },
    {
      description: `Guitarras, venta de guitarras, guitarra ${
        data ? data.title : ""
      }`,
    },
  ];
};

const Guitarra = () => {
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState({ state: false });
  const data = useLoaderData();
  const { id, description, price, title, imageUrl } = data;

  const { addToCart } = useOutletContext();

  const handleChange = (e) => {
    const selectedQuantity = +e.target.value;
    setQuantity(selectedQuantity);

    if (!selectedQuantity)
      setMessage({
        state: true,
        text: "Selecciona una cantidad",
        type: "error",
      });
    else setMessage({ ...message, state: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity)
      return setMessage({
        state: true,
        text: "Selecciona una cantidad",
        type: "error",
      });
    const selectedProduct = {
      id,
      title,
      imageUrl,
      quantity,
      price,
    };
    addToCart(selectedProduct);
    setMessage({ state: true, text: "Añadido al carrito", type: "success" });
  };
  return (
    <div className="guitarra">
      <img
        className="imagen"
        src={imageUrl}
        alt={`Imagen de la guitarra ${title}`}
      />

      <div className="contenido">
        <h3>{title}</h3>
        <p className="texto">{description}</p>
        <p className="precio">$ {price}</p>
        {message.state && <Message type={message.type}>{message.text}</Message>}
        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">Cantidad</label>
          <select name="cantidad" id="cantidad" onChange={handleChange}>
            <option value="">--Seleccione--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <input type="submit" value="Agregar al carrito" />
        </form>
      </div>
    </div>
  );
};

export default Guitarra;
