import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    // set Cart state to updated cart after item has been added
    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    //   quantity parameter in update method is put in a new object b/c it is only one of the things we want to update
      const { cart } = await commerce.cart.update(productId, { quantity })

      setCart(cart)
  }

  const handleRemoveFromCart = async (productId) => {
  
      const { cart } = await commerce.cart.remove(productId)

      setCart(cart)
  }

  const handleEmptyCart = async () => {
  
      const { cart } = await commerce.cart.empty()

      setCart(cart)
  }



  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path='/'>
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path='/cart'>
            <Cart 
            cart={cart}
            handleUpdateCartQty={handleUpdateCartQty}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
