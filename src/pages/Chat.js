import React, { useContext } from "react";
import ChatBody from "../components/chat/ChatBody";
import { ChatContext } from "../context/ChatContext";
import ChatForm from "../components/chat/ChatForm";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import useIsLargeScreen from "../utils/useIsLargeScreen";
import SideBar from "../components/menu/SideBar";
import { AuthContext } from "../context/AuthContext";
import { Alert } from "react-bootstrap";
import BackBtn from "../components/menu/BackBtn";
import { VersionContext } from "../context/VersionContext";
import BackBtnLarge from "../components/menu/BackBtnLarge";
import { Capacitor } from "@capacitor/core";

const Chat = () => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const { getMessages, messages, message } = useContext(ChatContext);
  const isLargeScreen = useIsLargeScreen();
  const { version } = useContext(VersionContext);
  const isNative = Capacitor.isNativePlatform();
  const chatSection = () => {
    if (isNative) {
      return "blue-background section-large page-large-container section-chat chat-app-height";
    } else {
      return "blue-background section-large page-large-container section-chat chat-section-height ";
    }
  };
  // back-nav-app
  useEffect(() => {
    version();
    getMessages();
  }, []);
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  return (
    <div className='dvh'>
      <BackBtn />
      {isLargeScreen && <BackBtnLarge />}
      <section className={chatSection()}>
        {/* <section className='section-background section-large page-large-container section-chat chat-section-height'> */}
        {isLargeScreen && <SideBar />}
        <div className='section-center h-100'>
          <div className='h-100 d-flex align-items-center justify-content-center'>
            <div className='h-100 w-100'>
              <div className='h-100'>
                {/* <h2 className='section-title pt-5'>Chat aperta</h2> */}
                <div
                  class='h-100 d-flex flex-column justify-content-around'
                  id='page-content'
                >
                  <div className='box box-warning direct-chat direct-chat-warning'>
                    {!isAuthenticated && (
                      <Alert
                        className='chat-footer p-1 chat-footer-info'
                        variant='info'
                      >
                        Effettua il <Link to='/login'>login </Link>per poter
                        partecipare attivamente alla chat!
                      </Alert>
                    )}
                    {/* <div class='box-header with-border'>
                      <h3 class='box-title'>Messaggi</h3>

                      <div class='box-tools pull-right'>
                        <span
                          data-toggle='tooltip'
                          title=''
                          class='badge bg-yellow'
                          data-original-title='3 New Messages'
                        >
                          20
                        </span>
                        <button
                          type='button'
                          class='btn btn-box-tool'
                          data-widget='collapse'
                        >
                          <i class='fa fa-minus'></i>
                        </button>
                        <button
                          type='button'
                          class='btn btn-box-tool'
                          data-toggle='tooltip'
                          title=''
                          data-widget='chat-pane-toggle'
                          data-original-title='Contacts'
                        >
                          <i class='fa fa-comments'></i>
                        </button>
                        <button
                          type='button'
                          class='btn btn-box-tool'
                          data-widget='remove'
                        >
                          <i class='fa fa-times'></i>
                        </button>
                      </div>
                    </div> */}
                    <ChatBody />
                  </div>
                  <ChatForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chat;
