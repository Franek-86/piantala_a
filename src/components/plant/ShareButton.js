import React, { useContext, useState } from "react";
import { FaFacebookMessenger, FaShare, FaWhatsapp } from "react-icons/fa";
import { PlantsContext } from "../../context/PlantsContext";

const ShareButton = ({ text, url }) => {
  const {
    plant: { image_url },
  } = useContext(PlantsContext);
  const [shareNow, setShareNow] = useState(false);

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${image_url}`, "_blank");
  };
  const handleMessengerShare = () => {
    window.open(`fb-messenger://share/?link=${image_url}`, "_blank");
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
