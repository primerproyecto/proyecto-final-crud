import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ProductDashboard, Spinner, AllCarritos } from "../components";
import { useProducts } from "../context/productsContext";
import { AgregarProducto } from "./AgregarProducto";
import {
  Button,
  Box,
  Container,
  Heading,
  Flex,
  Section,
  Grid,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialog,
} from "@radix-ui/themes";
import * as Toast from '@radix-ui/react-toast';

export const Dahsboard = () => {
  const { products, loading, setRecargar, setProducts } = useProducts();

  const [eleminarProducto, setEliminarProducto] = useState(false)

  return (
    <>
    <Box>
      <Container size="3">
        <div className="grilla-dashboard">
          <Heading as="h1" size="8">
            Dashboard
          </Heading>
          <Grilla>
            <Section>
              <Heading as="h2" size="7" mb="4">
                Todos los carritos
              </Heading>
              <AllCarritos />
            </Section>
            <Section>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <Heading as="h2" size="7" mb="4">
                    Todos los productos del catálogo
                  </Heading>
                  <Grid columns={{
                initial: '1',
                sm: '2',
                md: '3',
                lg: '4'
              }} gap="3" mt="5">
                    {products?.data ? (
                      products?.data?.map((item) => {
                        return (
                          <ProductDashboard
                            key={item._id}
                            producto={item}
                            setProducts={setProducts}
                            setEliminarProducto={setEliminarProducto}
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
    <Toast.Provider swipeDirection="right">

      <Toast.Root className="ToastRoot" open={eleminarProducto} onOpenChange={setEliminarProducto} >
        <Toast.Title className="ToastTitle">Producto Eliminado</Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
    </>
  );
};

const Grilla = styled.div`
  display: grid;
  > section {
    min-width: 50%;
  }
`;
