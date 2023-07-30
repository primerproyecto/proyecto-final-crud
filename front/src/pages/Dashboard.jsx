import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ProductGallery, Spinner } from "../components";
import { useProducts } from "../context/productsContext";
import { AgregarProducto } from "./AgregarProducto";

export const Dahsboard = () => {
  const { products, loading } = useProducts();
  return (
    <div className="grilla-dashboard">
      <h2>Dashboard</h2>
      <Grilla>
        <section>
          {loading ? (
            <Spinner />
          ) : (
            <fieldset className="grilla">
              <legend>Todos los productos</legend>
              {products.data.length > 0 ? (
                products?.data?.map((item) => {
                  return (
                    <ProductGallery
                      key={item._id}
                      producto={item}
                      modo="admin"
                    />
                  );
                })
              ) : (
                <h1>No hay productos</h1>
              )}
            </fieldset>
          )}
        </section>
        <section>
          <AgregarProducto />
        </section>
      </Grilla>
    </div>
  );
};

const Grilla = styled.div`
  display: flex;
  > section {
    min-width: 50%;
  }
`;
