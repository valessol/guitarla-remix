export const getAllProducts = async () => {
  const fetchedData = await fetch(`${process.env.API_URL}/products`);
  const data = await fetchedData.json();

  const formatData = () => {
    return data.map((d) => ({
      ...d,
      imageUrl: `${process.env.CLOUDINARY_BASE_URL}/v1680120548/GuitarLA/${d.url}.jpg`,
    }));
  };

  return formatData();
};

export const getProductById = async (id) => {
  const fetchedData = await fetch(`${process.env.API_URL}/products/${id}`);
  const data = await fetchedData.json();

  const formatData = () => {
    return {
      ...data,
      imageUrl: `${process.env.CLOUDINARY_BASE_URL}/v1680120548/GuitarLA/${data.url}.jpg`,
    };
  };

  return formatData();
};
