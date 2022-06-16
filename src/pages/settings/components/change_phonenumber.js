import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePhonenumber,
  resetChangePhonenumber,
} from "../../../store/setting/actions";
import SettingDialog from "./setting_dialog";
import * as Yup from "yup";
const ChangePhonenumber = () => {
  const dispatch = useDispatch();
  const {
    data: {
      user: { phone_number },
    },
  } = useSelector((data) => data.login);
  const { success, error, loading } = useSelector(
    (data) => data.changePhonenumber
  );

  const formik = useFormik({
    initialValues: {
      phone_number,
    },
    validationSchema: new Yup.object({
      phone_number:
        Yup.string().matches(/^9\d{8}$/, "invalid phone number format") ||
        Yup.string().matches(/^09\d{8}$/, "invalid phone number format"),
    }),
    onSubmit: (values, action) => {
      dispatch(changePhonenumber(values.phone_number));
    },
  });

  const { data: fetchUserData } = useSelector((state) => state.fetchUser);

  useEffect(() => {
    if (fetchUserData) {
      formik.setValues({
        phone_number: fetchUserData.phone_number,
      });
    }
  }, [fetchUserData]);

  useEffect(() => {
    return () => {
      dispatch(resetChangePhonenumber());
    };
  }, []);
  return (
    <div className="my-3">
      {success && (
        <SettingDialog
          severity="success"
          message="phone number changed successfully !"
          close={() => dispatch(resetChangePhonenumber())}
        />
      )}
      {error && (
        <SettingDialog
          severity="failure"
          message="changing phone number failed !"
          close={() => dispatch(resetChangePhonenumber())}
        />
      )}
      <form className="space-y-1" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <label>
            new phone number <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="phone_number"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            placeholder="e.g 0923456789"
            className="outline-none rounded px-2 py-1 border w-full"
          />
          <div className="text-sm text-red-500">
            {formik.errors.phone_number}
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

export default ChangePhonenumber;
