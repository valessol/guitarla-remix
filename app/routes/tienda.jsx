import React from "react";

export const loader = async () => {
  const fetchedData = await fetch(`${process.env.API_URL}/products`);
  return await fetchedData.json();
};

const Tienda = () => {
  return <div>tienda</div>;
};

export default Tienda;
