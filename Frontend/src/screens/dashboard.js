import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { getAllLinks } from "../services/linkService";
import { Tabs } from "antd";
import { Table, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { url } from "../config.json";

const { TabPane } = Tabs;
export default function Dashboard() {
  const [data, setdata] = useState(null);

  useEffect(() => {
    let get = async () => {
      let res = await getAllLinks();
      setdata(res.data);
      console.log("data", res.data);
    };
    get();
  }, []);
  function callback(key) {
    console.log(key);
  }
  let columns = [
    {
      title: "redirect-link",
      dataIndex: "hash",
      key: "hash",
      render: hash => (
        <a target="_blank" href={url + "l/" + hash} title={hash}>
          {url + "l/" + hash}
        </a>
      )
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
      render: text => {
        console.log(text);
        return (
          <Link to={"/link/" + text}>
            <Button type="primary">view details</Button>
          </Link>
        );
      }
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
