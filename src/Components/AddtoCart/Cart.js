import React from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const list = useSelector((state) => state.cart.list);
  return <div style={{ marginTop: "30%" }}>Cart</div>;
}
