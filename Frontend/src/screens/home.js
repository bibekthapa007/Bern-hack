import React, { useState } from "react";
import Layout from "../components/layout";
import { useHistory } from "react-router-dom";
import { Input, Row, Col, Button, Card } from "antd";
import { getLink } from "../services/linkService";
let { Meta } = Card;
export default function Home() {
  const [state, setstate] = useState(null);
  let history = useHistory();
  function handleChange(e) {
    setstate(e.target.value);
  }
  async function followLink() {
    getLink(state).then(res => {
      console.log(res);
      history.push("/link/" + res.data.link.hash);
    });
  }
  return (
    <Layout title="Home">
      <Row type="flex" justify="center">
        <Col>
          <h1>BiuBiu TRACKER</h1>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col xs={22} sm={22} md={15} lg={12} xl={12}>
          <Input
            className="create-input"
            placeholder="Paste your URL to start Tracking ..."
            onChange={handleChange}
          />
          <br />
          <br />
          <Row type="flex" justify="end">
            <Col>
              <Button className="wide-50" type="primary" onClick={followLink}>
                Create URL
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Shorten URLs" />
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Track IP address and Location" />
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Save for future refrence" />
      </Card>
    </Layout>
  );
}
