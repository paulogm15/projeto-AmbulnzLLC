import styled from "styled-components"
import { OrderItemCard } from "../components/OrderItemCard"

export const ContainerSection = styled.section`
width: 30em;
border: 1px solid black;

h1 {
    font-size: 1.5em;
    text-align: center;
}
`

export const OrderSummary = (props) => {

    const { cart, removeFromCart, total, confirmOrder } = props



    return (
        <ContainerSection>
            <h1>Resumo do Pedido</h1>

            {cart.map((pizza) => {
                return (
                    <OrderItemCard
                        key={pizza.name}
                        pizza={pizza}
                        removeFromCart={removeFromCart}
                    />
                )
            })}

            <h3>Total: {total.toLocaleString('pt-br', { style: 'currency', currency: 'USD' })}</h3>
            <button onClick={confirmOrder}>Finalizar Pedido</button>
        </ContainerSection>
    )
}