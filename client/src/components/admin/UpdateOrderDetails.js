import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Form,
  Input,
  Section,
  Button,
  ButtonContainer,
  Title,
} from "../common/Form";

const UpdateOrderDetails = ({
  order,
  formData,
  setFormData,
  pizzas,
  setOrderState,
}) => {
  const navigate = useNavigate();
  const [fetched, setFetched] = useState(false);

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fetched) {
      return;
    }

    if (verifyFormData()) {
      setFetched(true);

      fetch(`/orders/${order.id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newOrder: formData }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 400 || data.status === 500) {
            throw new Error(data.message);
          } else {
            setFormData(data.data);
            alert("Order updated successfully!");
            navigate("/admin");
          }
        })
        .catch((error) => {
          setError(error.message);
          setFetched(false);
        });
    } else {
      alert("Missing data!");
    }
  };

  const verifyFormData = () => {
    if ("pizza" in formData && "price" in formData) {
      const pizzaPrices = Object.values(
        pizzas.find((pizza) => pizza.id === formData["pizza"]).price
      );
      return pizzaPrices.includes(formData["price"]);
    }
    return false;
  };

  return (
    <>
      <Title>Order #{order.id}</Title>

      <Form onSubmit={handleSubmit}>
        <Section>
          <label htmlFor="fname">First name</label>
          <Input type="text" id="fname" defaultValue={order.fname} disabled />
        </Section>
        <Section>
          <label htmlFor="lname">Last name</label>
          <Input type="text" id="lname" defaultValue={order.lname} disabled />
        </Section>
        <Section>
          <label htmlFor="address">Address</label>
          <Input
            type="address"
            id="address"
            defaultValue={order.address}
            disabled
          />
        </Section>
        <Section>
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" defaultValue={order.email} disabled />
        </Section>
        <Section>
          <label htmlFor="phone">Phone number</label>
          <Input type="tel" id="phone" defaultValue={order.phone} disabled />
        </Section>
        {pizzas && (
          <Section>
            <label htmlFor="pizza">Pizza</label>
            <select
              name="pizza"
              id="pizza"
              defaultValue={order.pizza}
              onChange={(event) =>
                handleChange(event.target.id, event.target.value)
              }
            >
              <option value="default" disabled>
                Pick your pizza!
              </option>
              {pizzas.map((pizza) => {
                return (
                  <option value={pizza.id} key={pizza.id}>
                    {pizza.name}
                  </option>
                );
              })}
            </select>
          </Section>
        )}
        {"pizza" in formData && pizzas && (
          <Section>
            <label>Price: </label>
            {Object.entries(
              pizzas.find((pizza) => pizza.id === formData["pizza"]).price
            ).map(([size, price]) => {
              return (
                <div key={size}>
                  <Input
                    type="radio"
                    name="price"
                    id={price}
                    value={price}
                    checked={formData["price"] === price}
                    onChange={(event) =>
                      handleChange("price", event.target.value)
                    }
                  />
                  <label htmlFor={price}>
                    {size} {price}
                  </label>
                </div>
              );
            })}
          </Section>
        )}
        <Button type="submit">Save Changes</Button>
      </Form>
      <ButtonContainer>
        <Button disabled={fetched} onClick={() => setOrderState("read")}>
          Cancel
        </Button>
        <Button disabled={fetched} onClick={() => setOrderState("delete")}>
          Delete Order
        </Button>
        <Button disabled={fetched} onClick={() => setOrderState("rewrite")}>
          Rewrite Order
        </Button>
      </ButtonContainer>
    </>
  );
};

export default UpdateOrderDetails;
