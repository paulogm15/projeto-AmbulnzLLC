import styled from "styled-components"

export const ContainerDiv = styled.div`
    border: 1px solid black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    background-color: white;

    > div {
        position: relative;
        height: 100%;
        width: 100%;
        padding: 5em;

        .close-popup {
            position: absolute;
            top: 0;
            left: 100%;
            padding: 2px 5px;
            transform: translateX(-100%);
            width: auto;
            border-radius: 50%;
            :hover {
                cursor: pointer;
                font-weight: bold;
                background-color: lightgrey;
            }
        }
    }
`

export const OrderSuccessPopup = (props) => {
    const { order, closePopup } = props

    return (
        <ContainerDiv>
            <div>
                <h2>Pedido realizado com sucesso!</h2>
                <h3>Resumo do pedido</h3>
                <p>Id do pedido: {order.id}</p>
                {order.pizzas.map((pizza) => (
                    <p>
                        Pizza {pizza.name} {" "}
                        - {pizza.price.toLocaleString('pt-br', { style: 'currency', currency: 'USD' })}
                        {' '}x {pizza.quantity}
                    </p>
                ))}
                <p>Total pago: {order.total.toLocaleString('pt-br', { style: 'currency', currency: 'USD' })}</p>
                <spam className="close-popup" onClick={closePopup}>x</spam>
            </div>
        </ContainerDiv>
    )
}