import React from "react";
import Navbar from "./navbar/navbar";
import { Row, Col } from "antd";
function Layout(props) {
  return (
    <div>
      <Row type="flex" justify="center">
        <Col xs={4} sm={4} md={4} lg={5} xl={5} className="l-nav">
          <Navbar />
        </Col>
        <Col xs={20} sm={20} md={20} lg={18} xl={18} className="l-main">
          <Row type="flex">
            <Col className="l-main-main">{props.children}</Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default Layout;
