import React, { useEffect, useRef, useState } from "react";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";
import { useFormik } from "formik";
import { createDriver, resetCreateDriver } from "../../store/driver/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/back_button";
import PasswordVisiblity from "../../components/password_visiblity";
import * as Yup from "yup";
import { getDate } from "../../utils/date_format";
import ErrorMessage from "../../components/error_message";
import SuccessMessage from "../../components/success_message";
import Loading from "../../components/loading";

const AddEditDriver = () => {
  const dispatch = useDispatch();
  const {
    loading: createDriverLoading,
    success: createDriverSuccess,
    error: createDriverError,
  } = useSelector((state) => state.createDriver);

  const navigate = useNavigate();

  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [repeatPasswordVisibility, setRepeatPasswordVisibility] =
    useState(false);
  const initalValues = {
    birth_date: getDate(-365 * 18),
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "male",
    user_name: "",
    password: "",
    repeat_password: "",
  };

  const formik = useFormik({
    initialValues: initalValues,
    validationSchema: new Yup.object({
      email: Yup.string().email("invalid email"),
      phone_number:
        Yup.string().matches(/^9\d{8}$/, "invalid phone number") ||
        Yup.string().matches(/^09\d{8}$/, "invalid phone number"),
      first_name: Yup.string()
        .min("4", "first name too short")
        .required("first name is required")
        .matches(/^[A-Za-z]+$/, "Should only contain alphabets"),
      last_name: Yup.string()
        .min("4", "last name too short")
        .required("last name is required")
        .matches(/^[A-Za-z]+$/, "should only contain alphabets"),
      user_name: Yup.string()
        .min(4, "username should be mininum of 4")
        .required("username is required"),
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
    onSubmit: async (values, action) => {
      const formData = new FormData();
      for (let val in values) {
        formData.append(`${val}`, values[val]);
      }
      if (imageFile) {
        formData.append("image", imageFile);
      }
      dispatch(createDriver(formData));
      // action.resetForm();
      // setImage(null);
    },
  });

  useEffect(() => {
    return () => {
      dispatch(resetCreateDriver());
    };
  }, []);

  const onImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setImageFile(e.target.files[0]);
  };


  useEffect(() => {
    return () => {
      dispatch(resetCreateDriver());
    };
  }, []);

  return (
    <>
      <div className="m-4 flex justify-end">
        <BackButton />
      </div>

      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="m-4 mb-2 capitalize font-semibold ">
          <div className="flex items-center space-x-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span>new driver</span>
          </div>
        </div>
        <div className="m-4 mt-0 space-y-2 bg-white p-3 font-normal rounded-md capitalize">
          <Loading open={createDriverLoading} />
          {createDriverError && (
            <ErrorMessage
              message={createDriverError}
              onClickHandler={() => {
                dispatch(resetCreateDriver());
              }}
            />
          )}
          {createDriverSuccess && (
            <SuccessMessage
              message="driver created successfully"
              onClickHandler={() => {
                dispatch(resetCreateDriver());
              }}
            />
          )}

          <div className="flex flex-col mb-2 space-y-1">
            <label>profile photo</label>
            <div
              className={`h-36 w-36 bg-gray-100 ${
                !image && "border-2"
              } border-dashed border-gray-500 flex justify-center items-center relative`}
            >
              <span
                onClick={(e) => {
                  imageRef.current.click();
                }}
                className="hover:cursor-pointer absolute -top-3 -right-3 p-2 bg-white rounded-full drop-shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </span>
              {!image && (
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
              {image && (
                <img
                  src={image}
                  className="h-full w-full object-cover"
                  data-cy="image-error"
                />
              )}
            </div>

            <input
              data-cy="image"
              ref={imageRef}
              className="hidden"
              type="file"
              onChange={onImageChange}
              accept=".jpg,.png"
            />
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            <div>
              <div className="flex flex-col">
                <label>
                  first name <span className="text-red-500">*</span>
                </label>
                <input
                  data-cy="first-name"
                  className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
                  type="text"
                  placeholder="first name"
                  name="first_name"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.first_name && formik.errors.first_name && (
                <div
                  className="text-red-500 text-sm lowercase"
                  data-cy="first-name-error"
                >
                  {formik.errors.first_name}
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-col">
                <label>
                  last name <span className="text-red-500">*</span>
                </label>
                <input
                  className="border w-full p-2 rounded-md text-gray-600  bg-gray-50"
                  type="text"
                  placeholder="last name"
                  name="last_name"
                  data-cy="last-name"
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.last_name && formik.errors.last_name && (
                <div
                  className="text-red-500 text-sm lowercase"
                  data-cy="last-name-error"
                >
                  {formik.errors.last_name}
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-col">
                <label>email</label>
                <input
                  className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
                  type="text"
                  placeholder="email"
                  name="email"
                  data-cy="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div
                  className="text-red-500 text-sm lowercase"
                  data-cy="email-error"
                >
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-col">
                <label>phone number</label>
                <input
                  className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
                  type="number"
                  placeholder="phone number"
                  name="phone_number"
                  data-cy="phone-number"
                  onChange={formik.handleChange}
                  value={formik.values.phone_number}
                />
              </div>
              {formik.touched.phone_number && formik.errors.phone_number && (
                <div
                  className="text-red-500 text-sm lowercase"
                  data-cy="phonenumber-error"
                >
                  {formik.errors.phone_number}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label>
                Birth Date <span className="text-red-500">*</span>
              </label>
              <input
                className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
                type="date"
                name="birth_date"
                data-cy="birth_date"
                onChange={formik.handleChange}
                max={getDate(-365 * 18)}
                value={formik.values.birth_date}
              />
            </div>
            <div className="flex flex-col ">
              <label>
                gender <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-2 items-center">
                <div className="flex items-center space-x-2">
                  <input
                    name="gender"
                    type="radio"
                    checked={formik.values.gender == "male"}
                    onChange={formik.handleChange}
                    value="male"
                    data-cy="gender-male"
                  />
                  <label>male</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    name="gender"
                    type="radio"
                    checked={formik.values.gender == "female"}
                    onChange={formik.handleChange}
                    value="female"
                    data-cy="gender-female"
                  />
                  <label>female</label>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <label>
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
                  type="text"
                  placeholder="eg. abebe"
                  name="user_name"
                  onChange={formik.handleChange}
                  value={formik.values.user_name}
                  onBlur={formik.handleBlur}
                  data-cy="username"
                />
              </div>
              {formik.touched.user_name && formik.errors.user_name && (
                <div
                  className="text-red-500 text-sm lowercase"
                  data-cy="username-error"
                >
                  {formik.errors.user_name}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <div>
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
              </div>
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
                      type={passwordVisibility ? "text" : "password"}
                      name="repeat_password"
                      onChange={formik.handleChange}
                      value={formik.values.repeat_password}
                      onBlur={formik.handleBlur}
                      data-cy="repeat_password"
                    />
                  </div>
                </div>
                {formik.touched.repeat_password &&
                  formik.errors.repeat_password && (
                    <div
                      className="text-red-500 text-sm lowercase"
                      data-cy="repeat-password-error"
                    >
                      {formik.errors.repeat_password}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="flex space-x-3 justify-end mt-5">
            <CancelButton
              onCancelHandler={() => navigate("/admin/drivers/list")}
            />
            <SaveButton />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddEditDriver;
