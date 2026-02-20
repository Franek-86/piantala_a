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

const Chat = () => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const { getMessages, messages, message } = useContext(ChatContext);
  const isLargeScreen = useIsLargeScreen();
  useEffect(() => {
    getMessages();
  }, []);
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  return (
    <div className='d-flex flex-row'>
      {isLargeScreen && <SideBar />}
      <section className='section-page section-background section-large page-large-container section-chat'>
        <BackBtn />
        <div className='section-center'>
          <section className='pb-0 pt-3'>
            <div className='section-center'>
              {/* <h2 className='section-title pt-5'>Chat aperta</h2> */}
              <div class='page-content page-container' id='page-content'>
                <div class='col-md-4'></div>
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
          </section>
        </div>
      </section>
    </div>
  );
};

export default Chat;
