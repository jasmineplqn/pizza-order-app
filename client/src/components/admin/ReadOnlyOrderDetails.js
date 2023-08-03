import {
  Form,
  Input,
  Section,
  Button,
  ButtonContainer,
  Title,
} from "../common/Form";

const ReadOnlyOrderDetails = ({ order, pizzas, setOrderState }) => {
  return (
    <>
      <Title>Order #{order.id}</Title>
      {order && (
        <Form>
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
            <Input
              type="email"
              id="email"
              defaultValue={order.email}
              disabled
            />
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
                disabled
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
          {"pizza" in order && pizzas && (
            <Section>
              <label>Price: </label>
              {Object.entries(
                pizzas.find((pizza) => pizza.id === order["pizza"]).price
              ).map(([size, price]) => {
                return (
                  <div key={size}>
                    <Input
                      defaultChecked={order["price"] === price}
                      type="radio"
                      name="price"
                      id={price}
                      value={price}
                      disabled
                    />
                    <label htmlFor={price}>
                      {size} {price}
                    </label>
                  </div>
                );
              })}
            </Section>
          )}
        </Form>
      )}
      {order && (
        <ButtonContainer>
          <Button onClick={() => setOrderState("update")}>Update Order</Button>
          <Button onClick={() => setOrderState("delete")}>Delete Order</Button>
          <Button onClick={() => setOrderState("rewrite")}>
            Rewrite Order
          </Button>
        </ButtonContainer>
      )}
    </>
  );
};

export default ReadOnlyOrderDetails;
