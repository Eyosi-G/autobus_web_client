import React, { useState } from "react";
import Accordion from "../../components/accordion";
import ChangeEmail from "./components/change_email";
import ChangePassword from "./components/change_password";
import ChangePhonenumber from "./components/change_phonenumber";

const Settings = () => {
  return (
    <div>
      <div className="font-semibold p-2 text-lg flex items-center space-x-1 ">
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
        <span>Account Settings</span>
      </div>
      <div className="bg-white p-2 rounded-md ">
        <Accordion head={<div>Change Password</div>}>
          <ChangePassword />
        </Accordion>
        <Accordion head={<div>Change Email</div>}>
          <ChangeEmail />
        </Accordion>
        <Accordion head={<div>Edit Phone Number</div>}>
          <ChangePhonenumber />
        </Accordion>
      </div>
    </div>
  );
};

export default Settings;
