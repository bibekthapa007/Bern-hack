import React, { useState, useEffect } from "react";
import { Row, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import "./navbar.css";
import authService from "../../services/authService";
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
        <Menu
          inlineCollapsed={collapse}
          style={{ border: 0 }}
          defaultSelectedKeys={"1"}
        >
          <Menu.Item key="0">
            <Icon type="fire" theme="filled" style={{ fontSize: "26px" }} />
          </Menu.Item>
          <Menu.Item key="1" style={{ margin: " 20px 0px" }}>
            <Link to="/">
              <Icon type="home" rotate={360} style={{ fontSize: "20px" }} />
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
            <Link to="/dashboard">
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
            <Link to="/articles">
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
            </Link>
          </Menu.Item>
          <Menu.Item key="4" style={{ margin: " 20px 0px" }}>
            <Link to="/history">
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
            </Link>
          </Menu.Item>
          {authService.getCurrentUser() ? (
            <Menu.Item key="5" style={{ margin: " 20px 0px" }}>
              <Link to="/logout">
                <Icon type="logout" style={{ fontSize: "20px" }} />
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    paddingLeft: "5px"
                  }}
                >
                  Log out
                </span>
              </Link>
            </Menu.Item>
          ) : (
            <Menu.Item key="5" style={{ margin: " 20px 0px" }}>
              <Link to="/login">
                <Icon type="login" style={{ fontSize: "20px" }} />
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    paddingLeft: "5px"
                  }}
                >
                  Log In
                </span>
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </Row>
  );
}
export default Navbar;
