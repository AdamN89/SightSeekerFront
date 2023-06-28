import { useState, useRef, useContext } from "react";
import "./Chat.css";
import CloseIcon from "../TopMenu/Icons/CloseIcon";
import SearchBar from "../SearchBar";
import Button from "../Button";
import ChatImage from "./ChatImage";
import ChatIcon from "../NavigationIcons/ChatIcon";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router";
import ChatsSearchBar from "./ChatsSearchBar";

export default function Chat() {
  const { closeMenu, closeTopMenu } = useContext(DataContext);
  const chatsRef = useRef(null);
  const navigate = useNavigate();

  // return (
  //   <>
  //     <button className="main_menu_btn" onClick={openMenu}>
  //       <ChatIcon />
  //     </button>
  //     <div
  //       className="chat__wrapper"
  //       style={{
  //         transform: isOpen ? `translateY(${0}px)` : `translateY(${-1000}px)`,
  //       }}
  //     >
  //       <div
  //         className="chat__body-wrapper"
  //         ref={menuRef}
  //         style={{ opacity: isOpen ? 2 : 0 }}
  //       >
  //         <div className="chat__body_header">
  //           <h1 className="title">Chats</h1>
  //           <button onClick={closeMenu}>
  //             <CloseIcon />
  //           </button>
  //         </div>
  //         <SearchBar />
  //         <div className="chat__body_body">
  //           <Button txt={"CREATE GROUP CHAT"} />
  //           <div className="groupchat">
  //             <div className="groupchat-content">
  //               <div className="groupchat-name">My group chat</div>
  //               <div className="groupchat-members">Stephan, Puri, Miro</div>
  //             </div>
  //             <div className="groupchat-graphic">
  //               <ChatImage />
  //             </div>
  //           </div>
  //           <div className="groupchat">
  //             <div className="groupchat-content">
  //               <div className="groupchat-name">My group chat</div>
  //               <div className="groupchat-members">Stephan, Puri, Miro</div>
  //             </div>
  //             <div className="groupchat-graphic">
  //               <ChatImage />
  //             </div>
  //           </div>
  //           <div className="groupchat">
  //             <div className="groupchat-content">
  //               <div className="groupchat-name">My group chat</div>
  //               <div className="groupchat-members">Stephan, Puri, Miro</div>
  //             </div>
  //             <div className="groupchat-graphic">
  //               <ChatImage />
  //             </div>
  //           </div>
  //           <div className="groupchat">
  //             <div className="groupchat-content">
  //               <div className="groupchat-name">My group chat</div>
  //               <div className="groupchat-members">Stephan, Puri, Miro</div>
  //             </div>
  //             <div className="groupchat-graphic">
  //               <ChatImage />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return {
    chatsRef,
    renderChatsPage: (
      <>
        <div className="navigation_wrapper">
          <div
            ref={chatsRef}
            className="navigation_wrapper_body navigaton_page_not_visible"
          >
            <div className="navigation_wrapper_body_header">
              <h1 className="title">Chats</h1>
              <button
                className="navigation_close_btn"
                onClick={() => {
                  closeMenu(chatsRef);
                  closeTopMenu();
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <ChatsSearchBar />
            {/* start of content of navigation page */}
            <div className="navigation_wrapper_body_content">
              <Button
                txt={"Create chat group"}
                func={() => navigate("/login")}
                key="login"
              />
              <div className="groupchat">
                <div className="groupchat_content">
                  <span>My group chat</span>
                  <p>Stephan, Puri, Miro</p>
                </div>
                <div className="groupchat_icon">
                  <ChatImage />
                </div>
              </div>
            </div>
            {/* end of content of navigation page */}
          </div>
        </div>
      </>
    ),
  };
}
