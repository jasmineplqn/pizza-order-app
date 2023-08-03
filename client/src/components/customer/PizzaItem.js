import { Link } from "react-router-dom";
import styled from "styled-components";

const PizzaItem = ({ name, imgSrc, startPrice, description, toppings, id }) => {
  return (
    <Container>
      <Image src={imgSrc} alt="pizzaPic" />
      <div>
        <p>{name}</p>
        <p>{description}</p>
        <p>Toppings: {toppings}</p>
        <p>Starting at {startPrice}</p>
      </div>
      <StyledLink to={`/pizza/${id}`}>More info</StyledLink>
    </Container>
  );
};

export default PizzaItem;

const Image = styled.img`
  width: 30%;
  height: 100%;
  object-fit: cover;
  margin-right: 0.5rem;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 175px;
  background-color: #f5c951;
`;

const StyledLink = styled(Link)`
  position: absolute;
  height: 30px;
  right: 10px;
  bottom: 10px;
`;
