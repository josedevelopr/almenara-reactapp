import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import { Form, Button, Divider, Input, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import * as Yup from "yup";

import LogoHospital from "../../images/logo_essalud.jpg";
import "./Login.css";
import { useFormik } from "formik";
import { login } from "../../services/UserService";
import tokenAuth from "../../config/token";

const openNotification = (msg, description, placement) => {
  notification.error({
    message: msg,
    description: description,
    placement,
  });
};

export const Login = ({ history }) => {
  const lastPath = localStorage.getItem("lastPath") || "/";
  const { dispatch } = useContext(AuthContext);
  const [loadSubmit, setLoadSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-Z]*$/, "Solo se admiten letras.")
      .required("Usuario requerido."),
    password: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-Z0-9]*$/, "Solo se admiten letras y números.")
      .required("Contraseña requerida."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (value) => {
      setLoadSubmit(true);
      login(value)
        .then((resp) => {
          console.log(resp);
          dispatch({
            type: types.login,
            payload: resp,
          });
          tokenAuth();
          history.replace(lastPath);
        })
        .catch((err) => {
          console.warn(err);
          openNotification("Error", "Credenciales no validas.", "topRight");
        })
        .finally(() => {
          setLoadSubmit(false);
        });
    },
  });

  return (
    <div className="Login">
      <div className="form-content">
        <img className="logo logo-login" src={LogoHospital} alt="Logo Hospital Almenara" />
        <h1>Iniciar Sesión</h1>
        <p>Bienvenido, inicie sesión para ingresar al sistema.</p>
        <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
          <Form.Item label="Usuario:" required>
            <Input
              prefix={<UserOutlined />}
              size="large"
              placeholder="Ingrese usuario"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && formik.touched.username ? (
              <div className="error-field">{formik.errors.username}</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Contraseña:" required>
            <Input.Password
              prefix={<LockOutlined />}
              size="large"
              placeholder="Ingrese su contraseña"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="error-field">{formik.errors.password}</div>
            ) : null}
          </Form.Item>
          <Form.Item>
            <Button
              loading={loadSubmit}
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
