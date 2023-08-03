import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Container } from "../common/Form";
import { getMenu } from "../../api/helpers";

const Confirmation = () => {
  const params = useParams();
  const [order, setOrder] = useState(null);
  const [pizzas, setPizzas] = useState(null);

  useEffect(() => {
    let mounted = true;

    getMenu((pizzas) => {
      if (mounted) {
        setPizzas(pizzas);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    fetch(`/orders/${params.orderId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          if (mounted) {
            setOrder(data.data);
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
      <Container>
        <h1>Order Confirmation</h1>
        {order && pizzas ? (
          <div key={order}>
            <p>Order number: {order.id}</p>
            <p>
              For: {order.fname} {order.lname}
            </p>
            <p>Delivery at: {order.address}</p>
            <p>Email: {order.email}</p>
            <p>Phone number: {order.phone}</p>
            <p>
              Pizza selected:{" "}
              {pizzas.find((pizza) => pizza.id === order.pizza).name} for{" "}
              {order.price}
            </p>
          </div>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </>
  );
};

export default Confirmation;
