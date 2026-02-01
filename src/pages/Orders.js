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
import useIsLargeScreen from "../utils/useIsLargeScreen";
import SideBar from "../components/menu/SideBar";
import BackBtn from "../components/menu/BackBtn";
import { MdDone } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { RiProgress3Line } from "react-icons/ri";
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
  const isLargeScreen = useIsLargeScreen();
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
    <div className='d-flex flex-row'>
      {loading && <Loading />}
      {isLargeScreen && <SideBar />}
      <section className='section-page section-background section-full-page section-orders section-large page-large-container'>
        <BackBtn />
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
                const completed = status === "completed";
                const pending = status === "pending";
                const progress = status === "progress";
                return (
                  <>
                    <tr key={index}>
                      <td>{formatDate(created_at)}</td>
                      <td>{order_number}</td>
                      <td className='order-icons'>
                        {completed ? (
                          <MdDone />
                        ) : pending ? (
                          <MdOutlinePending />
                        ) : progress ? (
                          <RiProgress3Line />
                        ) : (
                          <></>
                        )}
                      </td>
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
    </div>
  );
};

export default Orders;
