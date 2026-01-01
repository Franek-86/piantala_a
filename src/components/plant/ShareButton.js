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

const ShareButton = ({ share }) => {
  const {
    plant: { image_url },
  } = useContext(PlantsContext);
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

  // image
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
  const handleImageCopy = () => {
    copyToClipboard(image_url, "noalert");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };
  return (
    <div className='d-flex align-items-center '>
      <div
        className='btn btn-primary'
        onClick={() => {
          setShareNow(!shareNow);
        }}
      >
        Condividi {share === "page" ? "pagina" : "immagine"}
        {""}
        <FaShare />
      </div>
      {shareNow && (
        <section className='d-flex w-50 ps-2'>
          <div
            className='contacts-social-icon'
            onClick={() => {
              share === "page"
                ? handleWhatsAppPageShare()
                : handleWhatsAppShare();
            }}
          >
            <FaWhatsapp />
          </div>
          {checkPlatform && (
            <div
              className='contacts-social-icon ms-3'
              onClick={() => {
                share === "page"
                  ? handleMessengerPageShare()
                  : handleMessengerShare();
              }}
            >
              <FaFacebookMessenger />
            </div>
          )}
          <div
            className='contacts-social-icon ms-3 position-relative'
            onClick={() => {
              share === "page" ? handlePageCopy() : handleImageCopy();
            }}
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
