import axios from "axios"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { PizzaCard } from "../components/PizzaCard"
import { BASE_URL } from "../constansts"

export const ContainerSection = styled.section`
    ul {
        display: flex;
    }
`

export const PizzasMenu = (props) => {

    const { addToCart } = props

    const [pizzas, setPizzas] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/pizzas`)
            .then((res) => {
                setPizzas(res.data.pizzas)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <ContainerSection>
            <ul>
                {pizzas.map((pizza) => {
                    return (
                        <PizzaCard
                            pizza={pizza}
                            key={pizza.name}
                            addToCart={addToCart}
                        />
                    )
                })}
            </ul>
        </ContainerSection>
    )
}