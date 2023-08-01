import React, { useEffect, useState } from "react";
import { getAllCarritos } from "../services/API_user/carrito.service";

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
    fetchData("que es allcarritos", allCarritos);
  }, []);
  console.log(allCarritos);
  return (
    <div>
      {allCarritos &&
        allCarritos.map((item) => {
          if (item._id !== "64babe016c57e80da1bd5620") {
            return (
              <div key={item._id}>
                <li>Carrito Id: {item._id}</li>
                <li>
                  Productos:
                  <ul>
                    {item.products.map((item) => {
                      return (
                        <li key={item.productId._id}>
                          {item.productId.title} - cantidad {item.cantidad}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </div>
            );
          }
        })}
    </div>
  );
};
