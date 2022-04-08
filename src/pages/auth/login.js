import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader, ClockLoader, MoonLoader } from "react-spinners";
import Dialog from "../../components/dialog";
import Modal from "../../components/modal";
import Spinner from "../../components/spinner";
import lionLogo from "../../resources/images/lion.png";
import { resetSignIn, signIn } from "../../store/auth/actions";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data, error } = useSelector((state) => state.login);
  const initialValues = {
    username: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, action) => {
      dispatch(signIn(values));
      action.resetForm();
    },
  });

  useEffect(() => {
    if (data && data.user.role === "admin") {
      navigate("/admin/dashboard");
    }
  }, [data]);
  return (
    <div className="grid grid-cols-4 h-screen ">
      <Modal open={error}>
        <Dialog
          severity="failure"
          message={error}
          close={() => dispatch(resetSignIn())}
        />
      </Modal>
      <div className="col-span-1 bg-gray-900 flex flex-col items-center justify-center">
        <img src={lionLogo} className="h-36 w-36" />
        <div className="font-semibold italic text-lg text-gray-50">
          Lion Bus
        </div>
        <div className="text-gray-50">Ethiopia's first city bus provider.</div>
      </div>
      <div className="col-span-3 flex items-center justify-center">
        <form
          className="w-2/3 space-y-3 flex flex-col"
          onSubmit={formik.handleSubmit}
        >
          <div className="text-xl font-semibold my-5 text-center">Log in</div>
          <div>
            <div className="capitalize">username</div>
            <input
              className="w-full border p-2 rounded-md"
              placeholder="Enter Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <div className="capitalize">password</div>
            <input
              className="w-full border p-2 rounded-md"
              placeholder="Enter Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex justify-end">forgot password ?</div>
          <div className="py-2"></div>
          <button
            type="submit"
            className="bg-gray-900 w-full rounded-md p-2 text-gray-50 "
          >
            {loading ? <Spinner color="white" size={10} /> : "login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
