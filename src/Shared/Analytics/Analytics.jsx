import React from 'react';
import ReactGA from "react-ga4";

const Analytics = () => {
    const TRACKING_ID="G-KJ3NVJE0HJ"
    ReactGA.initialize(TRACKING_ID);
    // ReactGA.initialize([
    //     {
    //       trackingId: "your GA measurement id",
    //       gaOptions: {},
    //       gtagOptions: {}, // optional
    //     },
    //     {
    //       trackingId: "your second GA measurement id",
    //     },
    //   ]);
      
      // Send pageview with a custom path
      ReactGA.send({ hitType: "pageview", page: "/my-path", title: "Custom Title" });
      
      // Send a custom event
      ReactGA.event({
        category: "your category",
        action: "your action",
        label: "your label", // optional
        value: 99, // optional, must be a number
        nonInteraction: true, // optional, true/false
        transport: "xhr", // optional, beacon/xhr/image
      });
    return (
        <div>
            
        </div>
    );
};

export default Analytics;