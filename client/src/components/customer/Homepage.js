import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { getMenu } from "../../api/helpers";
import PizzaOnMenu from "./PizzaOnMenu";

const Homepage = () => {
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

  return <>{!pizzas ? <CircularProgress /> : <PizzaOnMenu data={pizzas} />}</>;
};

export default Homepage;
