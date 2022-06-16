import { data } from "autoprefixer";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/spinner";
import { changeEmail, resetChangeEmail } from "../../../store/setting/actions";
import SettingDialog from "./setting_dialog";
import * as Yup from "yup";
const ChangeEmail = () => {
  const dispatch = useDispatch();
  const {
    data: {
      user: { email },
    },
  } = useSelector((data) => data.login);

  const { success, error, loading } = useSelector((data) => data.changeEmail);

  const formik = useFormik({
    initialValues: {
      email: email,
    },
    validationSchema: new Yup.object({
      email: Yup.string().email("invalid email"),
    }),
    onSubmit: (values, action) => {
      dispatch(changeEmail(values.email));
    },
  });
  const { data: fetchUserData } = useSelector((state) => state.fetchUser);

  useEffect(() => {
    formik.setValues({
      email: data.email,
    });
  }, [fetchUserData]);

  useEffect(() => {
    return () => {
      dispatch(resetChangeEmail());
    };
  }, []);

  return (
    <div className="my-3">
      {success && (
        <SettingDialog
          severity="success"
          message="email changed successfully !"
          close={() => dispatch(resetChangeEmail())}
        />
      )}
      {error && (
        <SettingDialog
          severity="failure"
          message="changing email failed !"
          close={() => dispatch(resetChangeEmail())}
        />
      )}
      <form className="space-y-1 " onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <label>
            new email <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            placeholder="e.g abebe@gmail.com"
            className="outline-none rounded px-2 py-1 border w-full"
          />
        </div>
        <div className="text-sm text-red-500">{formik.errors.email}</div>
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

export default ChangeEmail;
