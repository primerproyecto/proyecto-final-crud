import { useEffect, useContext, useState } from "react";
import { ProductGallery, Spinner } from "../components";
import Buscador from "../components/Buscador";
import { Search, X } from "react-feather";
import { useAuth } from "../context/authContext";
import { useProducts } from "../context/productsContext";

export const Home = () => {
  const { products, loading, setProducts } = useProducts();

  const [filterProducts, setFilterProducts] = useState(() => products);

  const [palabraABuscar, setPalabraABuscar] = useState("");

  const handleFormSearch = (e) => {
    e.preventDefault();
    const coincidentes = products?.data.filter((item) => {
      return item.title.includes(palabraABuscar);
    });
    setFilterProducts({ data: coincidentes });
  };


  const funcionFiltrar = (objetosAFiltrar) => {
    const filtrados = filterProducts?.data.filter((item) => {
      return item.categories === objetosAFiltrar
    })
    console.log('que son complementos', filtrados)
    setFilterProducts({ data: filtrados });
  }
  

   useEffect(() => {
    console.log('hay cambios', filterProducts)
    
   }, [filterProducts]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
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
              <button onClick={() => setPalabraABuscar("")}>
                <X />
              </button>
            </div>
            <div>
              <button onClick={() => funcionFiltrar('Complementos')}>Complementos</button>
              <button onClick={() => funcionFiltrar('Electrónico')}>Electrónico</button>
            </div>
          </form>
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
