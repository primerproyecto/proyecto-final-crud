import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ProductDashboard, Spinner, AllCarritos } from "../components";
import { useProducts } from "../context/productsContext";
import { AgregarProducto } from "./AgregarProducto";
export const Dahsboard = () => {
  const { products, loading, setRecargar } = useProducts();
  return (
    <div className="grilla-dashboard">
      <h2>Dashboard</h2>
      <Grilla>
        <section>
          <fieldset>
            <legend>Todos los carritos</legend>
            <AllCarritos />
          </fieldset>
        </section>
        <section>
          {loading ? (
            <Spinner />
          ) : (
            <fieldset className="grilla">
              <legend>Todos los productos</legend>
              {products?.data.length > 0 ? (
                products?.data?.map((item) => {
                  return (
                    <ProductDashboard
                      key={item._id}
                      producto={item}
                      modo="dashboard"
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
  display: grid;
  > section {
    min-width: 50%;
  }
`;
