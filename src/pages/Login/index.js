import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import { Form, Button, Divider, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import LogoHospital from "../../images/logo_hospital.svg";
import "./Login.css";

export const Login = ({ history }) => {
  const lastPath = localStorage.getItem("lastPath") || "/";
  const { dispatch } = useContext(AuthContext);
  const [loadSubmit, setLoadSubmit] = useState(false);

  const handleLogin = () => {
    setLoadSubmit(true);
    setTimeout(() => {
      setLoadSubmit(false);
      dispatch({
        type: types.login,
        payload: {
          name: "Jorge Gonzales",
        },
      });
      history.replace(lastPath);
    }, 2000);
  };

  return (
    <div className="Login">
      <div className="form-content">
        <img src={LogoHospital} alt="Logo Hospital Almenara" />
        <h1>Iniciar Sesión</h1>
        <p>Bienvenido, inicie sesión para ingresar al sistema.</p>
        <Form layout="vertical">
          <Form.Item label="Usuario:" required>
            <Input
              prefix={<UserOutlined />}
              size="large"
              placeholder="Ingrese su usuario"
            />
          </Form.Item>
          <Form.Item label="Contraseña:" required>
            <Input.Password
              prefix={<LockOutlined />}
              size="large"
              placeholder="Ingrese su contraseña"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loadSubmit}
              onClick={handleLogin}
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              Ingresar
            </Button>
          </Form.Item>
        </Form>
        <Divider>
          <InfoCircleOutlined />
        </Divider>
        <p>
          Control de Asistencia - <b>Hospital Guillermo Almenara</b>
        </p>
      </div>
    </div>
  );
};
