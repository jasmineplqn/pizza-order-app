import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../GlobalStyles";
import Header from "./common/Header";
import Homepage from "./customer/Homepage";
import PizzaDetails from "./customer/PizzaDetails";
import Order from "./customer/Order";
import Confirmation from "./customer/Confirmation";
import Admin from "./admin/Admin";
import OrderDetails from "./admin/OrderDetails";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/order" element={<Order />} />
        <Route path="/pizza/:pizzaId" element={<PizzaDetails />} />
        <Route path="/order/:pizzaId" element={<Order />} />
        <Route path="/order/:pizzaId/:size" element={<Order />} />
        <Route path="/confirm/:orderId" element={<Confirmation />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
