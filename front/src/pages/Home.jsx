import { useEffect, useContext, useState } from "react";
import { ProductGallery, Spinner } from "../components";
import Buscador from "../components/Buscador";
import { Search, X } from "react-feather";
import { useAuth } from "../context/authContext";
import { useProducts } from "../context/productsContext";
import { getAllProducts } from "../services/API_user/product.service";
import * as Form from "@radix-ui/react-form";

import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  MagnifyingGlassIcon,
  Cross1Icon
} from "@radix-ui/react-icons";
import "./homeStyles.css";
import "./stylesCarrito.css";
import { Button, Flex, Box, Container, Section } from "@radix-ui/themes";

export const Home = () => {
  const { products, loading, setProducts, setLoading } = useProducts();
  // console.log('que son products', products)

  const [filterProducts, setFilterProducts] = useState(() => products);
  console.log("1 - que eson filterProducts", filterProducts);

  const [palabraABuscar, setPalabraABuscar] = useState("");
  const [mostrarTodos, setMostrarTodos] = useState(false);

  // función para manejar el envío de formulario.
  const handleFormSearch = (e) => {
    e.preventDefault();
    const coincidentes = products?.data.filter((item) => {
      return item.title.includes(palabraABuscar);
    });
    setFilterProducts({ data: coincidentes });
  };

 
  const funcionFiltrar = (categoriaABuscar) => {
    const filtrados = products?.data.filter((item) => {
      return item.categories === categoriaABuscar;
    });
    setFilterProducts({ data: filtrados });
  };

  useEffect(() => {
    //Llamamos de primera a esta función para mostrar los productos.
    getAllProducts().then((res) => {
      // setProducts(res);
      setFilterProducts(res);
      setLoading(() => false);
    });
  }, [mostrarTodos]);

  useEffect(() => {
    //Llamamos de primera a esta función para mostrar los productos.
    getAllProducts().then((res) => {
      // setProducts(res);
      setFilterProducts(res);
      setLoading(() => false);
    });
  }, [mostrarTodos]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Box>
            <Container size="3">
              <form onSubmit={handleFormSearch}>
            <Flex gap="3" align="center">
              <input
                type="text"
                value={palabraABuscar}
                onChange={(e) => {
                  setPalabraABuscar(e.target.value);
                }}
              />
              <Button>
                <MagnifyingGlassIcon />
              </Button>
              <Button onClick={() => setPalabraABuscar("")}>
                <Cross1Icon />
              </Button>
            </Flex>
          </form>
              <Flex gap="3" align="center">
                <Button variant="surface" size="3" onClick={() => funcionFiltrar("Complementos")}>
                  Complementos
                </Button>
                <Button variant="surface" size="3" onClick={() => funcionFiltrar("Electrónico")}>
                  Electrónico
                </Button>
                <Button variant="surface" size="3"
                  onClick={() => setMostrarTodos((prevValue) => !prevValue)}
                >
                  Todos
                </Button>
              </Flex>
              <div className="grilla">
                {filterProducts ? (
                  filterProducts?.data?.map((item) => {
                    return (
                      <Section key={item._id}>
                        <ProductGallery key={item._id} producto={item} />
                      </Section>
                    );
                  })
                ) : (
                  <h1>No hay productos</h1>
                )}
              </div>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};
