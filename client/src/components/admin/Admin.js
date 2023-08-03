import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { Container, LinkContainer } from "../common/Form";

const Admin = () => {
  const [orders, setOrders] = useState();
  useEffect(() => {
    let mounted = true;
    fetch(`/orders`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          if (mounted) {
            setOrders(data.data);
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
      {orders ? (
        <>
          <Container>
            {orders.length === 0
              ? "No Orders Yet"
              : orders.map((order) => {
                  return (
                    <LinkContainer key={order.id}>
                      <Link to={`/orders/${order.id}`}>
                        {order.fname} {order.lname} - {order.pizza} - {order.id}
                      </Link>
                    </LinkContainer>
                  );
                })}
          </Container>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Admin;
