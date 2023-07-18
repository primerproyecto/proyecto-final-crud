import { useEffect } from "react";
import { ProductGallery, Spinner } from "../components";
import { useAuth } from "../context/authContext";
import { useProducts } from "../context/productsContext";

export const Home = () => {
  const { products, loading } = useProducts();
  const { user } = useAuth();
  /* useEffect(() => {}, [user]); */
  console.log("que es user desde la home", user);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grilla">
          {products?.data?.map((item) => {
            return <ProductGallery key={item._id} producto={item} />;
          })}
        </div>
      )}
    </>
  );
};
