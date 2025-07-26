import React, { useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import { OrdersContext } from "../context/OrdersContext";
import { formatDate } from "../utils/utils";

const Orders = () => {
  const { getAllOrders, allOrders } = useContext(OrdersContext);
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  useEffect(() => {
    console.log("salve a tutti");
    getAllOrders();
  }, []);
  return (
    <>
      <section className='section-page section-background'>
        <div className='back-container'>
          <div className='back-btn'>
            <MdBackspace
              onClick={() => {
                backToMap();
              }}
            />
          </div>
        </div>
        <div className='section-center menu-section-center'>
          <h2 className='section-title'>Ordini</h2>
          <Table striped hover>
            <thead>
              <tr>
                <th>Data</th>
                <th>Ordine</th>
                <th>Stato</th>
                {/* <th>Last Name</th>
                <th>Username</th> */}
              </tr>
            </thead>
            <tbody>
              {allOrders.map((i) => {
                const { order_number, status, created_at } = i;
                return (
                  <tr>
                    <td>{formatDate(created_at)}</td>
                    <td>{order_number}</td>
                    <td>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default Orders;
