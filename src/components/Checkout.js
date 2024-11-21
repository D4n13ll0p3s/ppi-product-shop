import { useContext } from "react";
import { CartContext } from "../context/CartContext";




export default function Checkout() {
 
  const { items, updateItemQuantity } = useContext(CartContext);


 
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);


 
  const handleRemoveItem = (id) => {
   
    updateItemQuantity(id, -1);
  };


  const handleIncreaseQuantity = (id) => {
   
    updateItemQuantity(id, 1);
  };


  return (
    <section id="checkout">
      <h2 style={{ textAlign: "center" }}>Seu Carrinho</h2>


      {items.length === 0 ? (
        <p style={{ textAlign: "center" }}>Seu carrinho está vazio, compra alguma coisa ai pow, namoral...</p>
      ) : (
        <div>
          <ul id="cart-items">
            {items.map((item) => (
              <li id={`item-${item.id}`} key={`item-${item.id}`}>
                <img src={item.thumbnail} alt={item.title} />
                <div>
                <h3 style={{ color: "#000" }}>{item.title}</h3>
<p style={{ color: "#000" }}>Preço: ${item.price}</p>
<p style={{ color: "#000" }}>Quantidade: {item.quantity}</p>
<p style={{ color: "#000" }}>Total: ${item.price * item.quantity}</p>


                </div>
                <div>
                 


                  <button onClick={() => handleIncreaseQuantity(item.id)}>Adicionar</button>
                  <button onClick={() => handleRemoveItem(item.id)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>


          <div id="total">
            <h3>Total: ${totalPrice}</h3>
          </div>
        </div>
      )}
    </section>
  );
}



