import React from "react";
import { Skeleton } from "antd";
import Layout from "../components/layout";
export default function History() {
  return (
    <Layout title="History">
      <div className="history">
        <Skeleton />
      </div>
    </Layout>
  );
}
