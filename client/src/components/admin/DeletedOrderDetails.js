import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, ButtonContainer, Title } from "../common/Form";

const DeleteOrderDetails = ({ order, setOrderState }) => {
  const navigate = useNavigate();
  const [fetched, setFetched] = useState(false);

  const handleDelete = () => {
    if (fetched) {
      return;
    }
    setFetched(true);

    fetch(`/orders/${order.id}`, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        }
        alert("Order deleted successfully!");
        navigate("/admin");
      })
      .catch((error) => {
        alert(error.message);
        setFetched(false);
      });
  };

  return (
    <>
      <Title>Delete Order #{order.id}</Title>

      <ButtonContainer>
        <Button disabled={fetched} onClick={handleDelete}>
          Yes
        </Button>
        <Button disabled={fetched} onClick={() => setOrderState("read")}>
          No
        </Button>
      </ButtonContainer>
    </>
  );
};

export default DeleteOrderDetails;
