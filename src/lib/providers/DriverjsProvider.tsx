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
            title: "Welcome to ZenSync !",
            description:
              "Let's take a quick walkthrough some of the key features and functionalities.",
            side: "left",
            align: "start",
          },
        },
        {
          element: "#workspace",
          popover: {
            title: "Workspace's",
            description:
              "Expand your horizons! Use this button to create a new workspace or switch between existing ones effortlessly.",
            side: "left",
          },
        },
        {
          element: ".addFolder",
          popover: {
            title: "Create Folder",
            description:
              "Stay organized! Hit this button to create folders within your workspace ",
            side: "left",
            align: "start",
          },
        },
        {
          element: ".addFile",
          popover: {
            title: "Create File",
            description:
              "Use this button to add files to your Folder and share important documents with your team",
            side: "left",
            align: "start",
          },
        },
        {
          element: ".settings",
          popover: {
            title: "Settings",
            description:
              "Fine-tune your collaboration! Access settings to manage team members, add new collaborators, and streamline your workspace for seamless teamwork.",
            side: "left",
            align: "start",
          },
        },
        {
          element: "#MeetingRoom",
          popover: {
            title: "Meeting Room",
            description:
              "Step into the meeting room to connect with your team, discuss ideas with the white board, and drive progress together.",
            side: "left",
            align: "end",
          },
        },
        {
          element: "#Conference",
          popover: {
            title: "Conference",
            description:
              "Instant connection! Tap here to start a call and collaborate in real-time with your team members, no matter where they are.",
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