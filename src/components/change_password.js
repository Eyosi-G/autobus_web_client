import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import CancelButton from "./cancel_button";
import PasswordVisiblity from "./password_visiblity";
import SaveButton from "./save_button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  adminChangePassword,
  changePassword,
  resetAdminChangePassword,
  resetChangePassword,
} from "../store/setting/actions";
import ErrorMessage from "./error_message";
import Spinner from "./spinner";
import SuccessMessage from "./success_message";
const ChangePassword = ({ userId, cancelHandler }) => {
  const [repeatPasswordVisibility, setRepeatPasswordVisibility] =
    useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const dispatch = useDispatch();
  const {
    loading: changePasswordLoading,
    success: changePasswordSuccess,
    error: changePasswordError,
  } = useSelector((state) => state.adminChangeOtherPassword);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: new Yup.ObjectSchema({
      newPassword: Yup.string()
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
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      dispatch(adminChangePassword(userId, values.newPassword));
    },
  });

  useEffect(() => {
    return () => dispatch(resetAdminChangePassword());
  }, []);
  return (
    <form className="p-4 space-y-2" onSubmit={formik.handleSubmit}>
      <div className="mb-4 flex justify-end border-b p-2">
        <button onClick={cancelHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex space-x-2">
        <div className="flex flex-col w-full">
          <label>
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="border w-full p-2 rounded-md text-gray-600 bg-gray-50 flex space-x-2 items-center">
            <PasswordVisiblity
              passwordVisiblity={passwordVisibility}
              setPasswordVisibility={setPasswordVisibility}
            />
            <input
              className="bg-gray-50 w-full outline-none"
              type={passwordVisibility ? "text" : "password"}
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              data-cy="password"
            />
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="text-red-500 text-sm lowercase">
              {formik.errors.newPassword}
            </div>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label>
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <div className="border w-full p-2 rounded-md text-gray-600 bg-gray-50 flex space-x-2 items-center">
            <PasswordVisiblity
              passwordVisiblity={repeatPasswordVisibility}
              setPasswordVisibility={setRepeatPasswordVisibility}
            />
            <input
              className="bg-gray-50 w-full outline-none"
              type={repeatPasswordVisibility ? "text" : "password"}
              name="confirmNewPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmNewPassword}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword && (
              <div
                className="text-red-500 text-sm lowercase"
                data-cy="password-error"
              >
                {formik.errors.confirmNewPassword}
              </div>
            )}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <CancelButton onCancelHandler={cancelHandler} />
        <SaveButton />
      </div>
      {changePasswordError && (
        <ErrorMessage
          message={changePasswordError}
          onClickHandler={() => dispatch(resetChangePassword())}
        />
      )}
      {changePasswordLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {changePasswordSuccess && (
        <SuccessMessage
          message="password successfully changed"
          onClickHandler={() => dispatch(resetChangePassword())}
        />
      )}
    </form>
  );
};

export default ChangePassword;
