import React from "react";
import { Skeleton } from "antd";
import Layout from "../components/layout";
export default function History() {
  return (
    <Layout title="Articles">
      <div className="articles">
        <Skeleton />
      </div>
    </Layout>
  );
}
