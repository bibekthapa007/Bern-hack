import React, { useState } from "react";
import Layout from "../components/layout";
import { getAllLinks } from "../services/linkService";
export default function Dashboard() {
  const [data, setdata] = useState(null);
  async function get() {
    getAllLinks().then(res => {
      setdata(res.data);
      console.log(data);
    });
  }
  return <Layout title="Dashboard"></Layout>;
}
