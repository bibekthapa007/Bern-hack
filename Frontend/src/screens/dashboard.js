import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { getAllLinks } from "../services/linkService";
import { Tabs } from "antd";
import { Table, Button, Row, Col } from "antd";

const { TabPane } = Tabs;
export default function Dashboard() {
  const [data, setdata] = useState(null);

  useEffect(() => {
    let get = async () => {
      let res = await getAllLinks();
      setdata(res.data);
      console.log("get");
    };
    get();
  }, []);
  console.log(data);
  function callback(key) {
    console.log(key);
  }
  let columns = [
    {
      title: "redirect-link",
      dataIndex: "hash",
      key: "hash"
    },
    {
      title: "original-link",
      dataIndex: "originalLink",
      key: "originalLink",
      render: text => <a>{text}</a>
    },
    {
      title: "details",
      dataIndex: "hash",
      key: "details",
      render: text => <Button type="primary">{"view details"}</Button>
    }
  ];
  return (
    <Layout title="Dashboard">
      <Row type="flex" justify="center">
        <Col sm={20}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Your Links" key="1">
              <Table columns={columns} dataSource={data} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Layout>
  );
}
