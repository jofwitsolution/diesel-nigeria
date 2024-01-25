import React from "react";

const ContactGoogleMap = () => {
  return (
    <div className="mapouter h-full">
      <div className="gmap_canvas h-full">
        <iframe
          title="Office"
          id="gmap_canvas"
          width={"100%"}
          height={"100%"}
          src="https://www.google.com/maps/embed/v1/place?q=40+Adaranijo+St,+Somolu,+Lagos+102216,+Nigeria&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactGoogleMap;
