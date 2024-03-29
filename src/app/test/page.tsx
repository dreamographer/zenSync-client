"use client"
import React, { useEffect } from "react";
import {driver} from "driver.js";

const MyComponent = () => {
  useEffect(() => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: "#element-of-mystery",
        popover: { title: "Title", description: "Description" },
      },
      {
        element: ".top-nav",
        popover: { title: "Title", description: "Description" },
      },
      {
        element: ".sidebar",
        popover: { title: "Title", description: "Description" },
      },
      {
        element: ".footer",
        popover: { title: "Title", description: "Description" },
      },
    ],
  });

  driverObj.drive();// Start the tour
  }, []);

  return (
    <div>
      {/* Your component content */}
      <div id="element-of-mystery">This is the element of mystery.</div>
    </div>
  );
};

export default MyComponent;
