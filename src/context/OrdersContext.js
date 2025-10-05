import { useContext } from "react";
import AxiosInstance from "../services/axiosInstance";
import { AuthContext } from "./AuthContext";
import { formatDate } from "../utils/utils";
import { toast } from "react-toastify";

const { createContext, useState } = require("react");
export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState();
  const { sendPaymentConfirmationEmail } = useContext(AuthContext);

  const [modalShow, setModalShow] = useState(false);
  const addOrder = async () => {
    let bookedPlant = JSON.parse(localStorage.getItem("booked-plant"));

    const { id, owner_id } = bookedPlant;
    try {
      let data = { id, owner_id };
      const response = await AxiosInstance.post("/api/orders/add-order", data);
      if (response.status === 201) {
      }
      return response.data.order;
    } catch (error) {}
  };

  const postPayment = async (email) => {
    const order = await addOrder();
    if (order) {
      const {
        created_at: createdAt,
        id,
        order_number,
        product_id,
        status,
        user_id,
      } = order;
      const created_at = formatDate(createdAt);
      // sendPaymentConfirmationEmail(email, order_number, created_at);
      const data = { email, order_number, created_at };
      sendPaymentConfirmationEmail(data);
    }
  };
  const getAllOrders = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get("/api/orders/all-orders");
      if (response.status === 200) {
        setAllOrders(response.data);
      } else {
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const updateOrder = async (data) => {
    setLoading(true);
    try {
      const response = await AxiosInstance({
        method: "patch",
        url: "/api/orders/update-order",
        data,
      });
      if (response.status === 200) {
        const text = response.data.message;
        toast(`${text}`);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <OrdersContext.Provider
      value={{
        postPayment,
        getAllOrders,
        allOrders,
        updateOrder,
        modalShow,
        setModalShow,
        orderId,
        setOrderId,
        loading,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
