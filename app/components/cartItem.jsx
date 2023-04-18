const CartItem = ({ data }) => {
  const { id, title, price, quantity, imageUrl } = data;
  console.log(data);
  return (
    <div className="item">
      <div>
        <img src={imageUrl} alt={`imagen guitarra ${title}`} />
      </div>
      <div>
        <p className="name">{title}</p>
        <p className="price">
          $ <span>{price}</span>
          <span> x{quantity} u.</span>
        </p>
        <p className="subtotal">
          Subtotal: $ <span>{price * quantity}</span>
        </p>
      </div>
    </div>
  );
};

export default CartItem;
