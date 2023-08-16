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
} from "@radix-ui/react-icons";
import "./homeStyles.css";

export const Home = () => {
  const { products, loading, setProducts, setLoading } = useProducts();

  const [filterProducts, setFilterProducts] = useState(() => products);

  const [palabraABuscar, setPalabraABuscar] = useState("");
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const [value, setValue] = React.useState("Complementos");
  // función para manejar el envío de formulario.
  const handleFormSearch = (e) => {
    e.preventDefault();
    const coincidentes = products?.data.filter((item) => {
      return item.title.includes(palabraABuscar);
    });
    setFilterProducts({ data: coincidentes });
  };

  // funcion para filtrar por una cadena de texto pasada como categoriaABuscar
  const funcionFiltrar = (categoriaABuscar) => {
    const filtrados = products?.data.filter((item) => {
      return item.categories === categoriaABuscar;
    });
    console.log("que eson filtrados", filtrados);
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
    if (value === "Complementos") {
      setFilterProducts({ data: funcionFiltrar("Complementos") });
    }
    if (value === "Electrónico") {
      setFilterProducts({ data: funcionFiltrar("Electrónico") });
    } else {
      setMostrarTodos((prevValue) => !prevValue);
    }
  }, [value]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* <form onSubmit={handleFormSearch}>
            <div>
              <input
                type="text"
                value={palabraABuscar}
                onChange={(e) => {
                  setPalabraABuscar(e.target.value);
                }}
              />
              <button>
                <Search />
              </button>
              <button onClick={() => setPalabraABuscar("")}>
                <X />
              </button>
            </div>
          </form> */}
          <Form.Root className="FormRoot" onSubmit={handleFormSearch}>
            <Form.Field className="FormField" name="email">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Form.Label className="FormLabel">Buscar producto</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter your email
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid email
                </Form.Message>
              </div>
              <Form.Control asChild>
                <>
                  <input
                    className="Input"
                    type="text"
                    required
                    value={palabraABuscar}
                    onChange={(e) => {
                      setPalabraABuscar(e.target.value);
                    }}
                  />
                  <button className="Button">
                    <Search />
                  </button>
                  <button
                    className="Button"
                    onClick={() => setMostrarTodos(true)}
                  >
                    <X /> Limpiar campo de búsqueda
                  </button>
                </>
              </Form.Control>
            </Form.Field>
          </Form.Root>

          <div>
            <ToggleGroup.Root
              className="ToggleGroup"
              type="single"
              defaultValue="center"
              value={value}
              aria-label="Text alignment"
              onValueChange={(value) => {
                console.log("que es value", value);
                if (value) setValue(value);
              }}
            >
              <ToggleGroup.Item
                className="ToggleGroupItem"
                value="Complementos"
                aria-label="Complementos"
              >
                <TextAlignLeftIcon />
              </ToggleGroup.Item>
              <ToggleGroup.Item
                className="ToggleGroupItem"
                value="Electrónico"
                aria-label="Electrónico"
              >
                <TextAlignCenterIcon />
              </ToggleGroup.Item>
              <ToggleGroup.Item
                className="ToggleGroupItem"
                value="Todos"
                aria-label="Right aligned"
              >
                <TextAlignRightIcon />
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
          <div className="grilla">
            {filterProducts ? (
              filterProducts?.data?.map((item) => {
                return <ProductGallery key={item._id} producto={item} />;
              })
            ) : (
              <h1>No hay productos</h1>
            )}
          </div>
        </>
      )}
    </>
  );
};
