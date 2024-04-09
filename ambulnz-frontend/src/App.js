import { useState } from "react";
import { OrderSummary } from "./screens/OrderSummary";
import { PizzasMenu } from "./screens/PizzasMenu";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./constansts";
import { OrderSuccessPopup } from "./components/OrderSuccessPopup";

export const ContainerMain = styled.main`
  display: flex;
`

const App = () => {

  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [orderSuccessPopupState, setOrderSuccessPopupState] = useState({
    isActive: false,
    summary: {
      id: null,
      pizzas: null,
      total: null
    }
  })

  useEffect(() => {
    calculateTotal()
  }, [cart])

  const addToCart = (pizzaToAdd) => {
    const foundIndex = cart.findIndex((pizzaInCart) => {
      return (pizzaInCart.name === pizzaToAdd.name)
    })

    if (foundIndex >= 0) {
      const newCart = [...cart]
      newCart[foundIndex].quantity += 1

      setCart(newCart)
    } else {
      const newCart = [...cart]
      const newPizza = {
        name: pizzaToAdd.name,
        price: pizzaToAdd.price,
        quantity: 1
      }
      newCart.push(newPizza)

      setCart(newCart)
    }
  }

  const removeFromCart = (pizzaToRemove) => {
    if (pizzaToRemove.quantity > 1) {
      const newCart = cart.map((pizza) => {
        if (pizza.name === pizzaToRemove.name) {
          pizza.quantity -= 1
        }

        return pizza
      })

      setCart(newCart)

    } else {
      const newCart = cart.filter((pizza) => {
        return pizza.name !== pizzaToRemove.name
      })

      setCart(newCart)
    }
  }

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    setTotal(total)
  }

  const confirmOrder = async () => {
    try {
      const body = {
        pizzas: cart
      }

      const res = await axios.post(`${BASE_URL}/orders`, body)

      setOrderSuccessPopupState({
        isActive: true,
        summary: res.data.order
      })

      setCart([])

    } catch (error) {
      console.log(error)
    }

  }

  const closePopup = () => {
    setOrderSuccessPopupState({
      isActive: false,
      summary: {
        id: null,
        pizzas: null,
        total: null
      }
    })
  }

  return (
    <ContainerMain>
      <PizzasMenu addToCart={addToCart} />
      <OrderSummary
        cart={cart}
        removeFromCart={removeFromCart}
        total={total}
        confirmOrder={confirmOrder}
      />
      {
        orderSuccessPopupState.isActive &&
        <OrderSuccessPopup
          order={orderSuccessPopupState.summary}
          closePopup={closePopup}
        />
      }
    </ContainerMain>
  );
}

export default App;