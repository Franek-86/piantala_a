import React, { useState } from "react";
import { FaFacebookMessenger, FaShare, FaWhatsapp } from "react-icons/fa";

const ShareButton = ({ text, url }) => {
  const [shareNow, setShareNow] = useState(false);

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=https://piantala-a.onrender.com/map/182`);
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
          <button onClick={() => handleWhatsAppShare()}>test</button>
        </section>
      )}
    </div>
  );
};

export default ShareButton;
