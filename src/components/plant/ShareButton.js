import React, { useContext, useEffect, useState } from "react";

import {
  FaAdjust,
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
import { useParams } from "react-router-dom";
import { Capacitor } from "@capacitor/core";

const ShareButton = () => {
  // const {
  //   plant: { image_url },
  // } = useContext(PlantsContext);
  const base =
    process.env.REACT_APP_NODE_ENV === "test"
      ? "http://localhost:3000"
      : "https://piantala-a.onrender.com";
  const checkPlatform = Capacitor.isNativePlatform();
  const [shareNow, setShareNow] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");
  const { plantId } = useParams();
  const pageUrl = `${base}/map/${plantId}`;
  console.log("qui", pageUrl);

  const handleFacebookPagePost = () => {
    window.open(
      `https://www.facebook.com/dialog/share?app_id=1558542848644058&display=popup&href=${pageUrl}&redirect_uri=${pageUrl}`,
      "_blank"
    );
  };

  // page
  const handleWhatsAppPageShare = () => {
    window.open(`https://wa.me/?text=${pageUrl}`, "_blank");
  };
  const handleMessengerPageShare = () => {
    window.open(`fb-messenger://share/?link=${pageUrl}`, "_blank");
  };

  const handlePageCopy = () => {
    copyToClipboard(pageUrl, "noalert");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div className='d-flex align-items-center'>
      <div
        className='btn btn-primary btn-small no-wrap'
        onClick={() => {
          setShareNow(!shareNow);
        }}
      >
        Condividi pagina
        <FaShare className='ms-1' />
      </div>
      {shareNow && (
        <section className='d-flex w-50 ps-2'>
          <div
            className='contacts-social-icon'
            onClick={() => {
              handleWhatsAppPageShare();
            }}
          >
            <FaWhatsapp />
          </div>

          <div
            className='contacts-social-icon ms-3'
            onClick={() => {
              handleFacebookPagePost();
            }}
          >
            <FaFacebook />
          </div>

          {checkPlatform && (
            <div
              className='contacts-social-icon ms-3'
              onClick={() => {
                handleMessengerPageShare();
              }}
            >
              <FaFacebookMessenger />
            </div>
          )}
          <div
            className='contacts-social-icon ms-3 position-relative'
            onClick={() => handlePageCopy()}
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
