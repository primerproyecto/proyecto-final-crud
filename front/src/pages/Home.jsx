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
  Cross1Icon,
} from "@radix-ui/react-icons";
import "./homeStyles.css";
import "./stylesCarrito.css";
import {
  Button,
  Flex,
  Box,
  Container,
  Section,
  Grid,
  Heading,
  Separator,
  IconButton,
} from "@radix-ui/themes";
import { Link } from "react-router-dom";
import * as Toggle from "@radix-ui/react-toggle";

export const Home = () => {
  const { products, loading, setProducts, setLoading } = useProducts();

  const [filterProducts, setFilterProducts] = useState(() => products);

  const [palabraABuscar, setPalabraABuscar] = useState("");
  const [mostrarTodos, setMostrarTodos] = useState(false);

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
      setFilterProducts(res);
      setLoading(() => false);
    });
  }, [mostrarTodos]);

  useEffect(() => {
    //Llamamos de primera a esta función para mostrar los productos.
    getAllProducts().then((res) => {
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
            <Container
              size={{
                initial: "1",
                sm: "2",
                md: "3",
              }}
              ml="2"
              mr="2"
            >
              <Flex gap="9" align="center" justify="between" wrap="wrap">
                <form onSubmit={handleFormSearch} >
                  <Flex gap="3" align="center">
                    <input
                      type="text"
                      value={palabraABuscar}
                      className="Input"
                      width="100%"
                      placeholder="buscar producto"
                      onChange={(e) => {
                        setPalabraABuscar(e.target.value);
                      }}
                    />
                    <IconButton variant="outline" color="pink">
                      <MagnifyingGlassIcon />
                    </IconButton>

                    <IconButton
                      variant="outline"
                      onClick={() => setPalabraABuscar("")}
                      color="pink"
                    >
                      <Cross1Icon />
                    </IconButton>
                  </Flex>
                </form>
                <Separator orientation="vertical" />
                <Flex gap="3" align="center">
                  <Toggle.Root
                    pressed
                    className="Button"
                    aria-label="Mostrar todos los complementos"
                    onPressedChange={() => funcionFiltrar("Complementos")}
                  >
                    Complementos
                  </Toggle.Root>
                  <Toggle.Root
                    pressed
                    className="Button"
                    aria-label="Mostrar todos los productos electrónicos"
                    onPressedChange={() => funcionFiltrar("Electrónico")}
                  >
                    Electrónico
                  </Toggle.Root>
                  <Toggle.Root
                    className="Button"
                    aria-label="Mostrar todos"
                    pressed
                    onPressedChange={() =>
                      setMostrarTodos((prevValue) => !prevValue)
                    }
                  >
                    Todos
                  </Toggle.Root>
                </Flex>
              </Flex>
              <Grid
                columns={{
                  initial: "1",
                  sm: "2",
                  lg: "3",
                }}
                gap="3"
                mt="5"
              >
                {filterProducts ? (
                  filterProducts?.data?.map((item) => {
                    return (
                      <Box
                        key={item._id}
                        style={{ boxShadow: "var(--shadow-3)" }}
                      >
                        <ProductGallery itemId={item._id} producto={item} />
                      </Box>
                    );
                  })
                ) : (
                  <Heading as="h1" size="6">
                    No hay productos
                  </Heading>
                )}
              </Grid>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};
