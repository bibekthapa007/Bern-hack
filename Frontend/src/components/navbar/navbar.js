import React, { useState, useEffect } from "react";
import { Row, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import "./navbar.css";
function Navbar() {
  const [collapse, setcollapse] = useState(false);
  const toggleCollapse = () => {
    window.innerWidth < 800 ? setcollapse(true) : setcollapse(false);
  };

  useEffect(() => {
    window.addEventListener("resize", toggleCollapse);
    return () => window.removeEventListener("mouseup", toggleCollapse);
  });
  return (
    <Row type="flex" justify="end">
      <div className="navbar">
        <Menu inlineCollapsed={collapse} style={{ border: 0 }}>
          <Menu.Item key="0">
            <Icon type="fire" theme="filled" style={{ fontSize: "26px" }} />
          </Menu.Item>
          <Menu.Item key="1" style={{ margin: " 20px 0px" }}>
            <Link to="/">
              <Icon type="home" style={{ fontSize: "20px" }} />
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  paddingLeft: "5px"
                }}
              >
                Home
              </span>
            </Link>
          </Menu.Item>

          <Menu.Item key="2" style={{ margin: " 20px 0px" }}>
            <Link to="/404">
              <Icon type="dashboard" style={{ fontSize: "20px" }} />
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  paddingLeft: "5px"
                }}
              >
                Dashboard
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" style={{ margin: " 20px 0px" }}>
            <Icon type="pic-left" style={{ fontSize: "20px" }} />
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                paddingLeft: "5px"
              }}
            >
              Articles
            </span>
          </Menu.Item>
          <Menu.Item key="4" style={{ margin: " 20px 0px" }}>
            <Icon type="history" style={{ fontSize: "20px" }} />
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                paddingLeft: "5px"
              }}
            >
              History
            </span>
          </Menu.Item>
          <Menu.Item key="5" style={{ margin: " 20px 0px" }}>
            <Icon type="setting" style={{ fontSize: "20px" }} />
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                paddingLeft: "5px"
              }}
            >
              Settings
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </Row>
  );
}
export default Navbar;
