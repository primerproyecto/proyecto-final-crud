import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ProductDashboard, Spinner, AllCarritos } from "../components";
import { useProducts } from "../context/productsContext";
import { AgregarProducto } from "./AgregarProducto";
import { Button, Box, Container, Heading, Flex, Section, Grid } from "@radix-ui/themes";

export const Dahsboard = () => {
  const { products, loading, setRecargar, setProducts } = useProducts();

  return (
    <Box>
    <Container size="3">
    <div className="grilla-dashboard">
      <Heading as="h1" size="8">Dashboard</Heading>
      <Grilla>
        <Section>
          <Heading as="h2" size="7" mb="4">Todos los carritos</Heading>
            <AllCarritos />
        </Section>
        <Section>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Heading as="h2" size="7" mb="4">Todos los productos del catálogo</Heading>
              <Grid columns="3" gap="3" width="auto">
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
              </Grid>
              </>
          )}
        </Section>
        <Section>
          <AgregarProducto />
        </Section>
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
