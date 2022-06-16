import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PasswordVisiblity from "../../../components/password_visiblity";
import {
  changePassword,
  resetChangePassword,
} from "../../../store/setting/actions";
import SettingDialog from "./setting_dialog";
import * as Yup from "yup";
const ChangePassword = () => {
  const [oldPasswordVisiblity, setOldPasswordVisiblity] = useState(false);
  const [newPasswordVisiblity, setNewPasswordVisiblity] = useState(false);
  const [confirmNewPasswordVisiblity, setConfirmNewPasswordVisiblity] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (data) => data.changePassword
  );

  const formik = useFormik({
    initialValues: {
      oldpassword: "",
      newpassword: "",
      confirmNewPassword: "",
    },
    validationSchema: new Yup.object({
      oldpassword: Yup.string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      newpassword: Yup.string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmNewPassword: Yup.string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .oneOf([Yup.ref("newpassword"), null], "Passwords must match"),
    }),
    onSubmit: (values, action) => {
      dispatch(changePassword(values.oldpassword, values.newpassword));
    },
  });

  useEffect(() => {
    return () => {
      dispatch(resetChangePassword());
    };
  }, []);

  return (
    <div className="my-2">
      {success && (
        <SettingDialog
          severity="success"
          message="password changed successfully !"
          close={() => dispatch(resetChangePassword())}
        />
      )}
      {error && (
        <SettingDialog
          severity="failure"
          message="changing password failed !"
          close={() => dispatch(resetChangePassword())}
        />
      )}
      <form className="space-y-2" onSubmit={formik.handleSubmit}>
        <div className="w-full">
          <label className="capitalize">
            old password <span className="text-red-600">*</span>
          </label>
          <div className="flex border space-x-1 rounded px-2 py-1 bg-gray-50">
            <PasswordVisiblity
              passwordVisiblity={oldPasswordVisiblity}
              setPasswordVisibility={setOldPasswordVisiblity}
            />
            <input
              name="oldpassword"
              value={formik.values.oldpassword}
              onChange={formik.handleChange}
              type={oldPasswordVisiblity ? "text" : "password"}
              className="outline-none bg-gray-50"
            />
          </div>
          <div className="text-sm text-red-500">
            {formik.errors.oldpassword}
          </div>
        </div>
        <div className="flex space-x-2 ">
          <div className="w-full">
            <label className="capitalize">
              new password <span className="text-red-600">*</span>
            </label>
            <div className="flex border space-x-1 rounded px-2 py-1 bg-gray-50">
              <PasswordVisiblity
                passwordVisiblity={newPasswordVisiblity}
                setPasswordVisibility={setNewPasswordVisiblity}
              />
              <input
                name="newpassword"
                value={formik.values.newpassword}
                onChange={formik.handleChange}
                type={newPasswordVisiblity ? "text" : "password"}
                className="outline-none bg-gray-50"
              />
            </div>
            <div className="text-sm text-red-500">
              {formik.errors.newpassword}
            </div>
          </div>
          <div className="w-full">
            <label className="capitalize">
              confirm new password <span className="text-red-600">*</span>
            </label>
            <div className="flex border space-x-1 rounded px-2 py-1 bg-gray-50">
              <PasswordVisiblity
                passwordVisiblity={confirmNewPasswordVisiblity}
                setPasswordVisibility={setConfirmNewPasswordVisiblity}
              />
              <input
                name="confirmNewPassword"
                value={formik.values.confirmNewPassword}
                onChange={formik.handleChange}
                type={confirmNewPasswordVisiblity ? "text" : "password"}
                className="outline-none bg-gray-50"
              />
            </div>
            <div className="text-sm text-red-500">
              {formik.errors.confirmNewPassword}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-700 text-gray-50 px-2 py-1 rounded-md"
            type="submit"
          >
            {loading ? "loading ..." : "save changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
