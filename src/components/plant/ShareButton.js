import React, { useState } from "react";
import { FaFacebookMessenger, FaShare, FaWhatsapp } from "react-icons/fa";

const ShareButton = ({ text, url }) => {
  const [shareNow, setShareNow] = useState(false);

  const handleWhatsAppShare = () => {
    window.open(
      `https://wa.me/?text=https://piantala-a.onrender.com/map/182`,
      "_blank"
    );
  };
  const handleMessengerShare = () => {
    window.open(
      `fb-messenger://share/?link=https://piantala-a.onrender.com/map/182`,
      "_blank"
    );
  };
  return (
    <div>
      <button
        onClick={() => {
          setShareNow(!shareNow);
        }}
      >
        Share
      </button>

      {shareNow && (
        <section>
          <button onClick={() => handleWhatsAppShare()}>wapp</button>
          <button onClick={() => handleMessengerShare()}>messenger</button>
        </section>
      )}
    </div>
  );
};

export default ShareButton;
