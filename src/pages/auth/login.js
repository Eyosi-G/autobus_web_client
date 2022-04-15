import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
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
  const [ passwordVisibility, setPasswordVisibility ] = useState(false);
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
            <div className="flex items-center space-x-1 border p-2 rounded-md">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <input
                className="w-full outline-none"
                placeholder="Enter Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div>
            <div className="capitalize">password</div>
            <div className="flex items-center space-x-1 border p-2 rounded-md">
              <button type="button" className="outline-none" onClick={()=>setPasswordVisibility(!passwordVisibility)}>
                {passwordVisibility ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <input
                className="w-full outline-none"
                placeholder="Enter Password"
                type={passwordVisibility ? "text": "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
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
