import { useState, useEffect } from "react";
import { getMenu } from "../../api/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Section, Button } from "../common/Form";

const Order = () => {
  const params = useParams();
  const [pizzas, setPizzas] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  const navigate = useNavigate();

  const updateData = (pizzas) => {
    setPizzas(pizzas);
    if ("pizzaId" in params) {
      if ("size" in params) {
        const size = params.size.charAt(0).toUpperCase() + params.size.slice(1);
        setFormData({
          ...formData,
          ["pizza"]: params.pizzaId,
          ["price"]: pizzas.find((pizza) => pizza.id === params.pizzaId).price[
            size
          ],
        });
      } else {
        setFormData({
          ...formData,
          ["pizza"]: params.pizzaId,
        });
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    getMenu((pizzas) => {
      if (mounted) {
        updateData(pizzas);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

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

      fetch("/orders", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: formData }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 400 || data.status === 500) {
            throw new Error(data.message);
          } else {
            setFormData(data.data);
            navigate(`/confirm/${data.data.id}`);
          }
        })
        .catch((error) => {
          setError(error.message);
          setFetched(false);
        });
    }
  };

  const verifyFormData = () => {
    const formFilled = Object.entries(formData).every(([key, value]) => {
      return value !== null && value !== "";
    });

    if ("pizza" in formData && "price" in formData && formFilled) {
      const pizzaPrices = Object.values(
        pizzas.find((pizza) => pizza.id === formData["pizza"]).price
      );
      return pizzaPrices.includes(formData["price"]);
    }
    return false;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Section>
        <label htmlFor="fname">First name</label>
        <Input
          type="text"
          id="fname"
          placeholder="John"
          onChange={(event) =>
            handleChange(event.target.id, event.target.value)
          }
        />
      </Section>
      <Section>
        <label htmlFor="lname">Last name</label>
        <Input
          type="text"
          id="lname"
          placeholder="Doe"
          onChange={(event) =>
            handleChange(event.target.id, event.target.value)
          }
        />
      </Section>
      <Section>
        <label htmlFor="address">Address</label>
        <Input
          type="address"
          id="address"
          placeholder="123 Street"
          onChange={(event) =>
            handleChange(event.target.id, event.target.value)
          }
        />
      </Section>
      <Section>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="example@email.com"
          onChange={(event) =>
            handleChange(event.target.id, event.target.value)
          }
        />
      </Section>
      <Section>
        <label htmlFor="phone">Phone number</label>
        <Input
          type="tel"
          id="phone"
          placeholder="111-111-1111"
          onChange={(event) =>
            handleChange(event.target.id, event.target.value)
          }
        />
      </Section>
      <Section>
        <label htmlFor="pizza">Pizza</label>
        <select
          name="pizza"
          id="pizza"
          defaultValue={"pizzaId" in params ? params.pizzaId : "default"}
          onChange={(event) =>
            handleChange(event.target.id, event.target.value)
          }
        >
          <option value="default" disabled>
            Pick your pizza!
          </option>
          {pizzas &&
            pizzas.map((pizza) => {
              return (
                <option value={pizza.id} key={pizza.id}>
                  {pizza.name}
                </option>
              );
            })}
        </select>
      </Section>
      {"pizza" in formData && (
        <Section>
          <label>Price: </label>
          {Object.entries(
            pizzas.find((pizza) => pizza.id === formData["pizza"]).price
          ).map(([size, price]) => {
            return (
              <div key={size}>
                <Input
                  checked={formData["price"] === price}
                  type="radio"
                  name="price"
                  id={price}
                  value={price}
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

      <Button type="submit">Gimme my pizza!</Button>
      {error && <div>ERROR: {error}</div>}
    </Form>
  );
};

export default Order;
