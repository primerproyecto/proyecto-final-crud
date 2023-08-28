import React, { useEffect, useState } from "react";
import { getAllCarritos } from "../services/API_user/carrito.service";
import * as Avatar from "@radix-ui/react-avatar";
import {
  Flex,
  Text,
  Button,
  Heading,
  Strong,
  Box,
  Card,
  Container,
} from "@radix-ui/themes";
import { aEuros, capitalizarPrimeraLetra } from "../utils";

export const AllCarritos = () => {
  const [allCarritos, setAllCarritos] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCarritos();
        setAllCarritos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(allCarritos);
  }, []);
  useEffect(() => {});
  return (
    <Box>
      {allCarritos &&
        allCarritos.map((item) => {
          if (item.propietario.rol && item.propietario.rol === "user") {
            return (
              <Card key={item._id} mb="4" style={{boxShadow: 'var(--shadow-2)'}}>
                <Flex gap="3" align="center">
                  <Flex shrink="0">
                    <Avatar.Root className="AvatarRoot">
                      <Avatar.Image
                        className="AvatarImage"
                        src={item.propietario.image}
                        alt="Colm Tuite"
                      />
                    </Avatar.Root>{" "}
                  </Flex>
                  <Text size="7">
                    {capitalizarPrimeraLetra(item.propietario.name)}
                  </Text>
                  <Flex align="center" width="100%">
                    Productos:{" "}
                    {item.products.map((item) => {
                      if (item.productId) {
                        return (
                          <Box width="100%" key={item.productId._id} ml="2">
                          <Strong>{item.productId.title}</Strong> - cantidad {item.cantidad} -
                            Total  
                            <Strong>{" "} {aEuros.format(item.productId.price)}</Strong>
                          </Box>
                        );
                      }
                    })}
                  </Flex>
                </Flex>
              </Card>
            );
          }
        })}
    </Box>
  );
};
