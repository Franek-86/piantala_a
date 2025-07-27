import { useContext } from "react";
import AxiosInstance from "../services/axiosInstance";
import { AuthContext } from "./AuthContext";
import { formatDate } from "../utils/utils";
import { toast } from "react-toastify";

const { createContext, useState } = require("react");
export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [orderId, setOrderId] = useState();
  const { sendPaymentConfirmationEmail } = useContext(AuthContext);

  const [modalShow, setModalShow] = useState(false);
  const addOrder = async () => {
    let bookedPlant = JSON.parse(localStorage.getItem("booked-plant"));
    console.log("plant-approved-after-payment", bookedPlant);

    const { id, owner_id } = bookedPlant;
    try {
      let data = { id, owner_id };
      const response = await AxiosInstance.post("/api/orders/add-order", data);
      if (response.status === 201) {
        console.log("responsedata", response.data);
        console.log("responseresp", response);
      }
      return response.data.order;
    } catch (error) {
      console.log("error from add order", error);
    }
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
      console.log("order number from payment function", order_number);
      console.log("oder in general", order);
      // sendPaymentConfirmationEmail(email, order_number, created_at);
      const data = { email, order_number, created_at };
      sendPaymentConfirmationEmail(data);
    }
  };
  const getAllOrders = async () => {
    try {
      const response = await AxiosInstance.get("/api/orders/all-orders");
      if (response.status === 200) {
        console.log("nn", response.data);
        setAllOrders(response.data);
      } else {
        console.log(response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateOrder = async (data) => {
    console.log("qqq", data);
    try {
      const response = await AxiosInstance({
        method: "patch",
        url: "/api/orders/update-order",
        data,
      });
      console.log("updateresponse", response);
      if (response.status === 200) {
        const text = response.data.message;
        toast(`${text}`);
      }
    } catch (error) {
      console.log(error);
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
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
