import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from  './styles'

const products = [
  { id: 1, name: "Shoes", description: "Puma Running Shoes.", price: "$50", image: 'https://images.puma.net/images/189074/08/sv01/fnd/PNA/' },
  { id: 2, name: "Macbook", description: "Apple Macbook.", price: "$900", image: 'https://s.yimg.com/os/creatr-uploaded-images/2020-12/d37e0460-3eeb-11eb-b7f9-449e864b9135' },
];

const Products = () => {
  const classes = useStyles()

  return (
    <main className={classes.content}>
      {/* the below div adds height in the exact size of navbar so navbar doesn't block Products */}
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
