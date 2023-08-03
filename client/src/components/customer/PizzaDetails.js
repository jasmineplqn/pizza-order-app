import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const PizzaDetails = () => {
  const params = useParams();
  const [pizza, setPizza] = useState(null);
  const [sizeSelected, setSizeSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(`/menu/${params.pizzaId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          if (mounted) {
            setPizza(data.data);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {!pizza ? (
        <CircularProgress />
      ) : (
        <Container>
          <Image src={pizza.src} alt="pizzaPic" />
          <div>
            <p>{pizza.name}</p>
            <p>{pizza.description}</p>
            <p>Toppings: {pizza.toppings}</p>
            <div>
              Price:
              {Object.entries(pizza.price).map(([size, price]) => {
                if (size === sizeSelected) {
                  return (
                    <Button key={size} onClick={() => setSizeSelected(size)}>
                      <Size>{size}</Size> {price}
                    </Button>
                  );
                }
                return (
                  <button key={size} onClick={() => setSizeSelected(size)}>
                    <Size>{size}</Size> {price}
                  </button>
                );
              })}
            </div>
          </div>
          {!sizeSelected ? (
            <StyledLink to={`/order/${pizza.id}`}>Order Now!</StyledLink>
          ) : (
            <StyledLink to={`/order/${pizza.id}/${sizeSelected}`}>
              Order Now!
            </StyledLink>
          )}
        </Container>
      )}
    </>
  );
};

export default PizzaDetails;

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

const Size = styled.span`
  font-weight: bold;
`;

const Button = styled.button`
  background-color: pink;
`;
