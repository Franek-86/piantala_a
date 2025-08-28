import React, { useContext } from "react";
import ChatBody from "../components/chat/ChatBody";
import { ChatContext } from "../context/ChatContext";
import ChatForm from "../components/chat/ChatForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";

const Chat = () => {
  const { getMessages, messages, message } = useContext(ChatContext);
  useEffect(() => {
    getMessages();
  }, []);
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  return (
    <section className='section-background section-full-page section-users'>
      <div className='back-container'>
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToMap();
            }}
          />
        </div>
      </div>

      <div className='section-center'>
        <section className='section-page section-background pb-0'>
          <div className='section-center'>
            <h2 className='section-title' style={{ "padding-top": "4rem" }}>
              Chat aperta
            </h2>
            <div class='page-content page-container' id='page-content'>
              <div class='col-md-4'></div>
              <div className='box box-warning direct-chat direct-chat-warning'>
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
  );
};

export default Chat;
