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

  useEffect(() => {}, [products]);

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
          </form>
          <div className="grilla">
            {filterProducts?.data?.length > 0 ? (
              filterProducts?.data?.map((item) => {
                console.log("que es item", item);
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
