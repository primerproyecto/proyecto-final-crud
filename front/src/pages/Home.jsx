import { useEffect, useContext, useState } from "react";
import { ProductGallery, Spinner } from "../components";
import Buscador from "../components/Buscador";
import { Search, X } from "react-feather";
import { useAuth } from "../context/authContext";
import { useProducts } from "../context/productsContext";
import { getAllProducts } from "../services/API_user/product.service";


export const Home = () => {
  const { products, loading, setProducts, setLoading } = useProducts();

  const [filterProducts, setFilterProducts] = useState(() => products);

  const [palabraABuscar, setPalabraABuscar] = useState("");
  const [mostrarTodos, setMostrarTodos] = useState(false)
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
      return item.categories === categoriaABuscar
    })
    setFilterProducts({ data: filtrados });
  }
  

   useEffect(() => {
    //Llamamos de primera a esta función para mostrar los productos. 
    getAllProducts().then((res) => {
      // setProducts(res);
      setFilterProducts(res)
      setLoading(() => false);
    });
   }, [mostrarTodos]);

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
          <div>
              <button onClick={() => funcionFiltrar('Complementos')}>Complementos</button>
              <button onClick={() => funcionFiltrar('Electrónico')}>Electrónico</button>
              <button onClick={() => setMostrarTodos((prevValue) => !prevValue)}>Todos</button>
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
