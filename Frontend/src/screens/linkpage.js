import React, { useState, useEffect } from "react";
import { url } from "../config.json";

import Layout from "../components/layout";
import link from "../services/linkService";
import { Row, Col, Tabs, Table, Button } from "antd";
const { TabPane } = Tabs;

export default function LinkPage(props) {
  const [data, setdata] = useState(null);
  const [ol, setol] = useState(null);

  const [uniquedata, setuniquedata] = useState(null);
  const ID = props.match.params.id;
  const shortURL = url + "l/" + ID;
  useEffect(() => {
    let get = async () => {
      let res = await link.getLinkStat(ID);
      setdata(res.data.data);

      let ures = await link.getUniqueLinkStat(ID);
      setuniquedata(ures.data.data);
      setol(res.data.originalLink);
      console.log(res);
    };
    get();
  }, []);
  let columns = [
    {
      title: "Time",
      dataIndex: "ent_date",
      key: "time"
    },
    {
      title: "IP address",
      dataIndex: "ip",
      key: "ip"
    },
    {
      title: "OS",
      dataIndex: "os",
      key: "os"
    },
    {
      title: "Browser Name",
      dataIndex: "browserName",
      key: "browser"
    },
    {
      title: "device",
      dataIndex: "device",
      key: "device"
    },
    {
      title: "source",
      dataIndex: "source",
      key: "source"
    }
  ];
  return (
    <Layout title="Dashboard">
      <Row type="flex" justify="center">
        <Col sm={20}>
          Short URL : {shortURL}
          <Button type="primary">
            <a href={shortURL} target="_blank">
              Visit
            </a>
          </Button>
          <br />
          Original Link : {ol}
          <Tabs defaultActiveKey="1" animated={false}>
            <TabPane tab="All Clicks" key="1">
              <Table columns={columns} dataSource={data} />
            </TabPane>
            <TabPane tab="Unique Clicks" key="2">
              <Table columns={columns} dataSource={uniquedata} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Layout>
  );
}
