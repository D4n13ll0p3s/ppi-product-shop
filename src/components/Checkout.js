import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";


export default function Checkout() {
    const { cartItems } = useContext(CartContext);

    return (
        <section className="checkout">
            <h2>Checkout</h2>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <img src={item.thumbnail} alt={item.title} />
                            <div>
                                <h3>{item.title}</h3>
                                <p>$ {item.price}</p>
                                <p>{item.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty</p>
            )}
            <Link to="/" className="product-actions">
                <button>RETURN</button>
            </Link>
        </section>
    );

}