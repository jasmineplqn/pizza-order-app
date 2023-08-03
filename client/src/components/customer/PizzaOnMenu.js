import styled from "styled-components";
import PizzaItem from "./PizzaItem";

const PizzaOnMenu = ({ data }) => {
  return (
    <Container>
      {data.map((pizza) => {
        return (
          <PizzaItem
            name={pizza.name}
            imgSrc={pizza.src}
            startPrice={pizza.price.Small}
            description={pizza.description}
            toppings={pizza.toppings}
            key={pizza.id}
            id={pizza.id}
          />
        );
      })}
    </Container>
  );
};

export default PizzaOnMenu;

const Container = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 50% 50%;
  padding: 1rem;
`;
