import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMenu } from "../../api/helpers";
import { CircularProgress } from "@mui/material";
import ReadOnlyOrderDetails from "./ReadOnlyOrderDetails";
import RewriteOrderDetails from "./RewriteOrderDetails";
import UpdateOrderDetails from "./UpdateOrderDetails";
import DeleteOrderDetails from "./DeletedOrderDetails";

const OrderDetails = () => {
  const params = useParams();
  const [pizzas, setPizzas] = useState(null);
  const [formData, setFormData] = useState({});
  const [order, setOrder] = useState(null);
  const [orderState, setOrderState] = useState("read");

  useEffect(() => {
    let mounted = true;
    fetch(`/orders/${params.orderId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          if (mounted) {
            const order = data.data;
            setOrder(order);
            setFormData({
              ...order,
              ["pizza"]: order.pizza,
              ["price"]: order.price,
            });
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

  const renderState = (orderState) => {
    switch (orderState) {
      case "read":
        return (
          <ReadOnlyOrderDetails
            order={order}
            pizzas={pizzas}
            setOrderState={setOrderState}
          />
        );
      case "update":
        return (
          <UpdateOrderDetails
            order={order}
            formData={formData}
            setFormData={setFormData}
            pizzas={pizzas}
            setOrderState={setOrderState}
          />
        );
      case "rewrite":
        return (
          <RewriteOrderDetails
            order={order}
            formData={formData}
            setFormData={setFormData}
            pizzas={pizzas}
            setOrderState={setOrderState}
          />
        );
      case "delete":
        return (
          <DeleteOrderDetails order={order} setOrderState={setOrderState} />
        );
      default:
        return (
          <ReadOnlyOrderDetails
            order={order}
            pizzas={pizzas}
            setOrderState={setOrderState}
          />
        );
    }
  };

  return <>{!order ? <CircularProgress /> : renderState(orderState)}</>;
};

export default OrderDetails;
