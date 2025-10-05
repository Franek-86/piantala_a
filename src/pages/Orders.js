import React, { useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import { OrdersContext } from "../context/OrdersContext";
import { formatDate } from "../utils/utils";
// import OrderModal from "../components/OrderModal";
import { Button } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import OrderModal from "../components/orders/OrderModal";

const Orders = () => {
  const {
    getAllOrders,
    allOrders,
    updateOrder,
    modalShow,
    setModalShow,
    orderId,
    setOrderId,
    loading,
  } = useContext(OrdersContext);
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  useEffect(() => {
    console.log("salve a tutti");
    getAllOrders();
  }, [modalShow]);

  const goToPlantPage = (prop) => {
    navigate(`/map/${prop}`, { state: { from: "/orders" } });
  };

  return (
    <>
      {loading && <Loading />}
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
          <Table size='sm' striped hover>
            <thead>
              <tr>
                <th>Data</th>
                <th>Ordine</th>
                <th>Stato</th>
                <th>Azione</th>
                {/* <th>Last Name</th>
                <th>Username</th> */}
              </tr>
            </thead>
            <tbody>
              {allOrders.map((i, index) => {
                const { id, order_number, status, created_at, product_id } = i;
                return (
                  <>
                    <tr key={index}>
                      <td>{formatDate(created_at)}</td>
                      <td>{order_number}</td>
                      <td>{status}</td>
                      <td>
                        {" "}
                        <div className='d-flex gap-1'>
                          <Button
                            size='sm'
                            onClick={() => {
                              setModalShow(true);
                              setOrderId(id);
                            }}
                          >
                            <FaPen />
                          </Button>
                          <Button
                            size='sm'
                            onClick={() => goToPlantPage(product_id)}
                          >
                            <FaRegEye />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    <OrderModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      id={orderId}
                    />
                  </>
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
