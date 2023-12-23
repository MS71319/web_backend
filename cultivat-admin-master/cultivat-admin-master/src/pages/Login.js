import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let schema = Yup.object().shape({
    email: Yup.string().email("Email should be valid").required("Email is Required"),
    password: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: { 
      email: "", 
      password: "" 
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
      alert(JSON.stringify(values, null, 2));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isLoading, isError, isSuccess, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } 
    else {
      navigate("");
    }

  }, [user, isLoading, isError, isSuccess]);

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">LOGIN</h3>
        <p className="text-start mb-1">Login to your account to continue</p>
        <div className="error text-center">
          {message.message == "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form action="">
          <CustomInput
            type="email"
            name="email"
            label="Email Address"
            id="floatingInputEmail"
            placeholder="email@email.com"
            val={formik.values.email}
            onCh={ formik.handleChange('email')}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
              
            ) : null}
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Password"
            id="floatingInputPassword"
            placeholder="Password"
            val={formik.values.password}
            onCh={ formik.handleChange('password')}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
              
            ) : null}
          </div>
          <div className="mb-3 text-end">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <button
            // to="/admin"
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            type="submit"
            style={{ background: "#ffb333" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
