import React from "react";
import { useId } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Box,
  Container,
  Heading,
  Flex,
  Section,
  Grid,
  AspectRatio,
  Card,
  Text,
  Strong
} from "@radix-ui/themes";
import { useProducts } from "../context/productsContext";

const DetalleProducto = () => {
  const { id } = useParams();
  const { products, loading, setProducts } = useProducts();

  const objetoEncontrado = products.data.find((objeto) => objeto._id === id);

  console.log("que son products", objetoEncontrado);
  return (
    <Box>
      <Container size="2">
        <Card>
        <Flex gap="3" direction="column">
          <AspectRatio ratio={16 / 9}>
            <img
              src={objetoEncontrado.image}
              alt={objetoEncontrado.title}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "var(--radius-2)",
              }}
            />
          </AspectRatio>
          <Box>
          <Flex align="center" justify="between">
            <Heading as="h1" size="6">{objetoEncontrado.title}</Heading><Text color="pink" size="6" as="p"><Strong>{objetoEncontrado.price}</Strong></Text>
            </Flex>
            <Flex direction="column" mt="4">
            <Text as="p">{objetoEncontrado.desc}</Text>
            
            </Flex>
            
          </Box>
          </Flex>
        </Card>
      </Container>
    </Box>
  );
};

export default DetalleProducto;
