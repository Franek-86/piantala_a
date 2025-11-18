import React, { useContext, useEffect, useState } from "react";

import {
  FaClipboardCheck,
  FaFacebook,
  FaFacebookMessenger,
  FaRegClipboard,
  FaShare,
  FaWhatsapp,
} from "react-icons/fa";
import { PlantsContext } from "../../context/PlantsContext";
import { PiAlignCenterVerticalSimple } from "react-icons/pi";
import { copyToClipboard } from "../../utils/utils";

const ShareButton = ({ text, url }) => {
  const {
    plant: { image_url },
  } = useContext(PlantsContext);

  const [shareNow, setShareNow] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");
  // useEffect(() => {
  //   window.FB.getLoginStatus((response) => {
  //     setFacebookUserAccessToken(response.authResponse?.accessToken);
  //   });
  // }, []);
  console.log(facebookUserAccessToken);

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${image_url}`, "_blank");
  };

  const handleMessengerShare = () => {
    window.open(`fb-messenger://share/?link=${image_url}`, "_blank");
  };
  const handleFacebookPost = () => {
    window.open(
      `https://facebook.com/sharer/sharer.php?u=${image_url}`,
      "_blank"
    );
  };
  const handleCopy = () => {
    copyToClipboard(image_url, "noalert");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div>
      <div
        className='btn btn-primary'
        onClick={() => {
          setShareNow(!shareNow);
        }}
      >
        Condividi {""}
        <FaShare />
      </div>
      {shareNow && (
        <section className='d-flex mt-2 w-50'>
          <div
            className='contacts-social-icon'
            onClick={() => handleWhatsAppShare()}
          >
            <FaWhatsapp />
          </div>
          <div
            className='contacts-social-icon ms-3'
            onClick={() => handleMessengerShare()}
          >
            <FaFacebookMessenger />
          </div>
          <div
            className='contacts-social-icon ms-3'
            onClick={() => handleFacebookPost()}
          >
            <FaFacebook />
          </div>
          <div
            className='contacts-social-icon ms-3 position-relative'
            onClick={() => handleCopy()}
          >
            {isCopied && (
              <small className='fst-italic mt-3  position-absolute copiato'>
                Copiato!
              </small>
            )}
            {!isCopied ? <FaRegClipboard /> : <FaClipboardCheck />}
          </div>
        </section>
      )}
    </div>
  );
};

export default ShareButton;
