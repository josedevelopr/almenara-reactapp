import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";

import "./Header.css";

export const Header = () => {
  const history = useHistory();
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({
      type: types.logout,
    });
    history.replace("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
        Cerrar Sesión
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="Header">
      <Dropdown overlay={menu}>
        <Button type="dashed" size="large">
          <UserOutlined /> {user.name}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};
