import { useEffect, useContext } from "react";
import { ProductGallery, Spinner } from "../components";
import { useAuth } from "../context/authContext";
import { useProducts } from "../context/productsContext";

export const Home = () => {
  const { products, loading } = useProducts();
  const { user } = useAuth();

  console.log("que es user", user);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grilla">
          {products.data.length > 0 ? (
            products?.data?.map((item) => {
              return <ProductGallery key={item._id} producto={item} />;
            })
          ) : (
            <h1>No hay productos</h1>
          )}
        </div>
      )}
    </>
  );
};
