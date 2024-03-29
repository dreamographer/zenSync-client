"use client"
import React, { useEffect, useRef } from "react";
import { driver } from "driver.js";
import "@/app/globals.css"

const DriverJs = () => {
  useEffect(() => {
    const driverObj = driver({
      popoverClass: "driverjs-theme",
      steps: [
        {
          element: "#tour-example",
          popover: {
            title: "Let's have a Quick walkthrough",
            description:
              "Some of the Main features of ZenSync.",
            side: "left",
            align: "start",
          },
        },
        {
          element: ".addFolder",
          popover: {
            title: "Animated Tour Example",
            description:
              "Here is the code example showing animated tour. Let's walk you through it.",
            side: "left",
            align: "start",
          },
        },
        {
          element: ".addFile",
          popover: {
            title: "Animated Tour Example",
            description:
              "Here is the code example showing animated tour. Let's walk you through it.",
            side: "left",
            align: "start",
          },
        },
        {
          element: "#workspace",
          popover: {
            title: "Animated Tour Example",
            description:
              "Here is the code example showing animated tour. Let's walk you through it.",
            side: "left",
          },
        },
        {
          element: "#MeetingRoom",
          popover: {
            title: "Import the Library",
            description:
              "It works the same in vanilla JavaScript as well as frameworks.",
            side: "left",
            align: "end",
          },
        },
        {
          element: "#Conference",
          popover: {
            title: "Importing CSS",
            description:
              "Import the CSS which gives you the default styling for popover and overlay.",
            side: "bottom",
            align: "start",
          },
        },
      ],
    });
    
    driverObj.drive();
    
  }, []);

  return <></>;
};

export default DriverJs;