import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ProductDashboard, Spinner, AllCarritos } from "../components";
import { useProducts } from "../context/productsContext";
import { AgregarProducto } from "./AgregarProducto";
import { Button, Box, Container } from "@radix-ui/themes";

export const Dahsboard = () => {
  const { products, loading, setRecargar, setProducts } = useProducts();
  





  return (
    <Box>
    <Container size="3">
    <div className="grilla-dashboard">
      <h2>Dashboard</h2>
      <Grilla>
        <section>
          <fieldset>
            <legend>Todos los carritos</legend>
            <AllCarritos />
          </fieldset>
        </section>
        <section>
          {loading ? (
            <Spinner />
          ) : (
            <fieldset className="grilla">
              <legend>Todos los productos</legend>
              {products?.data ? (
                products?.data?.map((item) => {
                  return (
                    <ProductDashboard
                      key={item._id}
                      producto={item}
                      setProducts={setProducts}
                    />
                  );
                })
              ) : (
                <h1>No hay productos</h1>
              )}
            </fieldset>
          )}
        </section>
        <section>
          <AgregarProducto />
        </section>
      </Grilla>
    </div>
    </Container>
    </Box>
  );
};

const Grilla = styled.div`
  display: grid;
  > section {
    min-width: 50%;
  }
`;
