import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/back_button";

const ScheduleDetail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-end my-2">
        <BackButton />
      </div>
      <div className="space-y-3 flex space-x-4">
        <div className="space-y-1 flex flex-col mt-2 bg-white p-2 border-l-8 border-l-gray-800 justify-center">
          <div className="space-x-2">
            <label className="font-semibold">Date</label>
            <span>-</span>
            <span>Jun 12, 2021</span>
          </div>
          <div className="space-x-2">
            <label className="font-semibold">Shift</label>
            <span>-</span>
            <span>Morning</span>
          </div>
          <div className="space-x-2">
            <label className="font-semibold">Bus Number</label>
            <span>-</span>
            <span>30</span>
          </div>
          <div className="space-x-2">
            <label className="font-semibold">Side Number</label>
            <span>-</span>
            <span>34204</span>
          </div>
        </div>
        <div className="space-x-2 flex ">
          <div className="bg-white p-2 flex flex-col space-x-2 rounded-sm ">
            <div className="flex justify-center relative">
              <img
                className="w-36 h-36 object-cover rounded-full"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
              />
              <span className="absolute right-6 bottom-0 p-2 bg-white rounded-full border shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              </span>
            </div>
            <div className="flex flex-col justify-center space-y-2 mt-3">
              <div className="space-x-2 font-semibold">
                <span>Eyosiyas</span>
                <span>Girma</span>
              </div>
              <div className="flex items-center space-x-2 ">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                <span>0911139074</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <span>abebe@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-2 flex flex-col space-x-2  rounded-sm ">
            <div className="flex justify-center relative">
              <img
                className="w-36 h-36 object-cover rounded-full"
                src="https://images.unsplash.com/photo-1532171875345-9712d9d4f65a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW4lMjBibGFjayUyMGhhaXJ8ZW58MHx8MHx8&w=1000&q=80"
              />
              <span className="absolute right-6 bottom-0 p-2 bg-white rounded-full border shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
                </svg>
              </span>
            </div>
            <div className="flex flex-col justify-center space-y-2 mt-3">
              <div className="space-x-2 font-semibold">
                <span>Selam</span>
                <span>Girma</span>
              </div>
              <div className="flex items-center space-x-2 ">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                <span>0911139074</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <span>abebe@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
