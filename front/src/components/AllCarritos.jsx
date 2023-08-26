import React, { useEffect, useState } from "react";
import { getAllCarritos } from "../services/API_user/carrito.service";
import * as Avatar from "@radix-ui/react-avatar";
import { Flex, Text, Button, Heading, Strong, Box, Card, Container } from "@radix-ui/themes";
import { capitalizarPrimeraLetra } from "../utils/text";

export const AllCarritos = () => {
  const [allCarritos, setAllCarritos] = useState();
  useEffect(() => {
    // Lógica para obtener los valores del endpoint
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

  useEffect(() => {
  });
  return (
    <Box>
      {allCarritos &&
        allCarritos.map((item) => {
          if (item._id && item._id !== "64cd2c33ea565eecb1f99b65") {
            return (
              <Card key={item._id} mb="4">
              <Flex gap="3" align="center">
                  <Avatar.Root className="AvatarRoot">
                    <Avatar.Image
                      className="AvatarImage"
                      src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                      alt="Colm Tuite"
                    />
                  </Avatar.Root>{" "}
                  <Text size="7">{capitalizarPrimeraLetra(item.propietario.name)}</Text>
                <Box>
                <Flex align="center">
                  Productos:
                  <ol>
                    {item.products.map((item) => {
                      if (item.productId) {
                        return (
                          <li key={item.productId._id}>
                           <Text> {item.productId.title} - cantidad {item.cantidad}</Text>
                          </li>
                        );
                      }
                    })}
                  </ol>
                  </Flex>
                </Box>
                </Flex>
              </Card>
            );
          }
        })}
    </Box>
  );
};
