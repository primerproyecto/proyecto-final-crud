import { useEffect, useContext, useState } from "react";
import { ProductGallery, Spinner } from "../components";
import Buscador from "../components/Buscador";
import { Search } from "react-feather";
import { useAuth } from "../context/authContext";
import { useProducts } from "../context/productsContext";

export const Home = () => {
  const { products, loading, setProducts } = useProducts();
  const { user } = useAuth();

  const [palabraABuscar, setPalabraABuscar] = useState("");

  const handleFormSearch = (e) => {
    e.preventDefault();
    const coincidentes = products?.data.filter((item) => {
      console.log("que es ", palabraABuscar.toString());
      item.title == palabraABuscar;
    });
    if (coincidentes) {
      console.log("coincidentes", coincidentes);
      setProducts(coincidentes);
    }
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
            </div>
          </form>
          <div className="grilla">
            {products?.data?.length > 0 ? (
              products?.data?.map((item) => {
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
