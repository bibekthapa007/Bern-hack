import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { getLinkStat } from "../services/linkService";
import { Row, Col, Tabs, Table } from "antd";
const { TabPane } = Tabs;

export default function LinkPage(props) {
  const [data, setdata] = useState(null);
  const ID = props.match.params.id;
  useEffect(() => {
    let get = async () => {
      let res = await getLinkStat(ID);
      setdata(res.data.data);
    };
    get();
  }, []);
  console.log(data);
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
      key: "os",
      render: text => <a>{text}</a>
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
          <Tabs defaultActiveKey="1">
            <TabPane tab="Your Links" key="1">
              <Table columns={columns} dataSource={data} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Layout>
  );
}
