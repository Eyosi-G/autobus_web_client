import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PasswordVisiblity from "../../../components/password_visiblity";
import {
  changePassword,
  resetChangePassword,
} from "../../../store/setting/actions";
import SettingDialog from "./setting_dialog";

const ChangePassword = () => {
  const [oldPasswordVisiblity, setOldPasswordVisiblity] = useState(false);
  const [newPasswordVisiblity, setNewPasswordVisiblity] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (data) => data.changePassword
  );

  const formik = useFormik({
    initialValues: {
      oldpassword: "",
      newpassword: "",
    },
    onSubmit: (values, action) => {
      dispatch(changePassword(values.oldpassword, values.newpassword));
    },
  });
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
      <form className="space-y-1" onSubmit={formik.handleSubmit}>
        <div className="flex space-x-2 ">
          <div className="w-full">
            <label>
              old password <span className="text-red-600">*</span>
            </label>
            <div className="flex border space-x-1 rounded px-2 py-1">
              <PasswordVisiblity
                passwordVisiblity={oldPasswordVisiblity}
                setPasswordVisibility={setOldPasswordVisiblity}
              />
              <input
                name="oldpassword"
                value={formik.values.oldpassword}
                onChange={formik.handleChange}
                type={oldPasswordVisiblity ? "text" : "password"}
                className="outline-none"
              />
            </div>
          </div>
          <div className="w-full">
            <label>
              new password <span className="text-red-600">*</span>
            </label>
            <div className="flex border space-x-1 rounded px-2 py-1">
              <PasswordVisiblity
                passwordVisiblity={newPasswordVisiblity}
                setPasswordVisibility={setNewPasswordVisiblity}
              />
              <input
                name="newpassword"
                value={formik.values.newpassword}
                onChange={formik.handleChange}
                type={newPasswordVisiblity ? "text" : "password"}
                className="outline-none"
              />
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
