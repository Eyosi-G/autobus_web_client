import { useFormik } from "formik";
import React, { useState } from "react";
import CancelButton from "./cancel_button";
import PasswordVisiblity from "./password_visiblity";
import SaveButton from "./save_button";
import * as Yup from "yup";
const ChangePassword = ({ cancelHandler }) => {
  const [repeatPasswordVisibility, setRepeatPasswordVisibility] =
    useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      repeat_password: "",
    },
    validationSchema: new Yup.ObjectSchema({
      password: Yup.string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      repeat_password: Yup.string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
  });
  return (
    <form className="p-4 space-y-2">
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
      <div className="flex flex-col">
        <label>
          Password <span className="text-red-500">*</span>
        </label>
        <div className="border w-full p-2 rounded-md text-gray-600 bg-gray-50 flex space-x-2 items-center">
          <PasswordVisiblity
            passwordVisiblity={passwordVisibility}
            setPasswordVisibility={setPasswordVisibility}
          />
          <input
            className="bg-gray-50 w-full outline-none"
            type={passwordVisibility ? "text" : "password"}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            data-cy="password"
          />
        </div>
      </div>
      {formik.touched.password && formik.errors.password && (
        <div
          className="text-red-500 text-sm lowercase"
          data-cy="password-error"
        >
          {formik.errors.password}
        </div>
      )}
      <div>
        <div className="flex flex-col">
          <label>
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="border w-full p-2 rounded-md text-gray-600 bg-gray-50 flex space-x-2 items-center">
            <PasswordVisiblity
              passwordVisiblity={repeatPasswordVisibility}
              setPasswordVisibility={setRepeatPasswordVisibility}
            />
            <input
              className="bg-gray-50 w-full outline-none"
              type={repeatPasswordVisibility ? "text" : "password"}
              name="repeat_password"
              onChange={formik.handleChange}
              value={formik.values.repeat_password}
              onBlur={formik.handleBlur}
              data-cy="repeat_password"
            />
          </div>
        </div>
        {formik.touched.repeat_password && formik.errors.repeat_password && (
          <div
            className="text-red-500 text-sm lowercase"
            data-cy="password-error"
          >
            {formik.errors.repeat_password}
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <CancelButton onCancelHandler={cancelHandler} />
        <SaveButton />
      </div>
    </form>
  );
};

export default ChangePassword;
