import React, { useEffect, useReducer, useRef, useState } from "react";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";
import { useFormik } from "formik";
import Dialog from "../../components/dialog";
import { createDriver, resetDriver } from "../../store/driver/actions";
import { connect } from "react-redux";

const AddEditDriver = (props) => {
  const selectedImage = useRef(null);
  const [image, setImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      user_name: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      gender: "male",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      for (let val in values) {
        formData.append(`${val}`, values[val]);
      }
      formData.append("image", image);
      props.createDriver(formData);
    },
  });

  const onImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <div className="m-4">
        <Dialog
          open={props.driver.failure}
          severity="failure"
          message="driver registraion failed !"
          close={() => props.resetDriver()}
        />
        <Dialog
          open={props.driver.success}
          severity="success"
          message="driver registered successfully !"
          close={() => props.resetDriver()}
        />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="m-4 flex capitaliz font-semibold">New Driver</div>
        <div className="m-4 space-y-2 bg-white p-3 font-normal rounded-md capitalize">
          <div className="flex flex-col mb-2 space-y-1">
            <label>profile photo</label>
            <div
              className={`h-36 w-36 bg-gray-100 ${
                !image && "border-2"
              } border-dashed border-gray-500 flex justify-center items-center relative`}
            >
              <span
                onClick={(e) => {
                  selectedImage.current.click();
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
                <img src={image} className="h-full w-full object-cover" />
              )}
            </div>

            <input
              ref={selectedImage}
              className="hidden"
              type="file"
              onChange={onImageChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            <div className="flex flex-col">
              <label>first name</label>
              <input
                className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
                type="text"
                placeholder="first name"
                name="first_name"
                onChange={formik.handleChange}
                value={formik.values.first_name}
              />
            </div>
            <div className="flex flex-col">
              <label>last name</label>
              <input
                className="border w-full p-2 rounded-md text-gray-600  bg-gray-50"
                type="text"
                placeholder="last name"
                name="last_name"
                onChange={formik.handleChange}
                value={formik.values.last_name}
              />
            </div>
            <div className="flex flex-col">
              <label>email</label>
              <input
                className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
                type="email"
                placeholder="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="flex flex-col">
              <label>phonenumber</label>
              <input
                className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
                type="number"
                placeholder="phonenumber"
                name="phone_number"
                onChange={formik.handleChange}
                value={formik.values.phone_number}
              />
            </div>
            <div className="flex flex-col">
              <label>username</label>
              <input
                className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
                type="text"
                placeholder="e.g abebe"
                name="user_name"
                onChange={formik.handleChange}
                value={formik.values.user_name}
              />
            </div>
            <div className="flex flex-col ">
              <label>gender</label>
              <div className="flex space-x-2">
                <div className="flex items-center space-x-2">
                  <input
                    name="gender"
                    type="radio"
                    checked={formik.values.gender == "male"}
                    onChange={formik.handleChange}
                    value="male"
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
                  />
                  <label>female</label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 justify-end mt-5">
            <CancelButton />
            <SaveButton />
          </div>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    driver: state.driver,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createDriver: (data) => dispatch(createDriver(data)),
    resetDriver: () => dispatch(resetDriver()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddEditDriver);
