import clientApp from "../../images/client_app.png";
import clientAppTwo from "../../images/client_app_2.png";
import logo from "../../images/logo.png";
import appleStore from "../../images/apple_store.png";
import googlePlay from "../../images/google_play.png";

import React from "react";

const LandingPage = () => {
  return (
    <div className="flex justify-between w-2/3 m-auto ">
      <div className="h-screen flex flex-col justify-center items-start">
        <h2 className="text-6xl flex">
          Li
          <img src={logo} className="h-14 w-14" />n Bus
        </h2>
        <p className="text-lg">Hop-on, Hop-off</p>
        <div className="flex mt-2 h-14">
          <button>
            <img src={googlePlay} className="h-10" />
          </button>
          <div className="w-2"></div>
          <button>
            <img src={appleStore} className="h-10" />
          </button>
        </div>
      </div>
      <div className="h-screen justify-center items-center hidden md:flex">
        <div className="h-3/4 flex items-center">
          <img src={clientAppTwo} className="h-3/4 -z-10" />
        </div>
        <div className="w-2"></div>
        <div>
          <img src={clientApp} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
