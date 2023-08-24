import React, { useEffect, useState } from "react";
import { getAllCarritos } from "../services/API_user/carrito.service";
import * as Avatar from "@radix-ui/react-avatar";
import { Flex, Text, Button, Heading, Strong, Box, Card, Container } from "@radix-ui/themes";

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
    <div>
      {allCarritos &&
        allCarritos.map((item) => {
          if (item._id && item._id !== "64cd2c33ea565eecb1f99b65") {
            return (
              <div key={item._id}>
                <li>
                  <Avatar.Root className="AvatarRoot">
                    <Avatar.Image
                      className="AvatarImage"
                      src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                      alt="Colm Tuite"
                    />
                    <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                      CT
                    </Avatar.Fallback>
                  </Avatar.Root>{" "}
                  {item.propietario.name}
                </li>
                <li>
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
                </li>
              </div>
            );
          }
        })}
    </div>
  );
};
