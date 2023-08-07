import React, { memo, useState, useRef } from "react";
import { Search } from "react-feather";
import { useProducts } from "../context/productsContext";

const Buscador = () => {
  const { products, loading, setProducts } = useProducts();
  const textInput = useRef(null);
  const [palabraABuscar, setPalabraABuscar] = useState("");

  const handleFormSearch = () => {
    const coincidentes = products?.data.filter(
      (item) => item.title === palabraABuscar
    );
    if (coincidentes) {
      console.log("coincidentes", coincidentes);
      setProducts(coincidentes);
    }
  };

  /* setProducts(coincidentes); */
  console.log("la palabra a buscar es", products);
  return (
    <div>
      {textInput.current?.value}
      <form onSubmit={handleFormSearch}>
        <div>
          <input
            type="text"
            value={palabraABuscar}
            onChange={(e) => {
              console.log("que es input", e.target.value);

              setPalabraABuscar(e.target.value);
            }}
          />
          <button>
            <Search />
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(Buscador);
