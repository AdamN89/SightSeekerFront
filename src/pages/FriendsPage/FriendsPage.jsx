import { useContext, useRef, useState } from "react";
import CloseIcon from "../../components/CloseIcon";
import SearchIcon from "../../components/SearchIcon";
import ButtonHallow from "../../components/ButtonHallow";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import InviteFriendsModal from "./InviteFriendsModal";
import { useNavigate } from "react-router-dom";
import "./FriendsPage.css";

export default function FriendsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { user, token, setUser, backendURL } = useContext(AuthContext);
  const [foundUsers, setFoundUsers] = useState([]);
  const [inviteUserModalIsOpen, setInviteUserModalIsOpen] = useState(false);
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const { closeMenu, closeTopMenu, setCurrentChat } = useContext(DataContext);
  const friendsRef = useRef(null);

  const handelUserSearch = (e) => {
    e.preventDefault();
    searchInputRef.current.blur();
    const fetchUsers = async (searchInput) => {
      const res = await fetch(`${backendURL}/user/find?search=${searchInput}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setFoundUsers(data.data);
      if (data.data.length > 0) setInviteUserModalIsOpen(true);
    };
    fetchUsers(searchInput);
    // setSearchInput("");
  };

  const handleFriendCheckbox = (e) => {
    if (e.target.checked) setSelectedUsers((prev) => [...prev, e.target.id]);
    if (!e.target.checked)
      setSelectedUsers((prev) =>
        prev.filter((friend) => friend !== e.target.id)
      );
  };

  const handleClose = () => {
    if (inviteUserModalIsOpen) setInviteUserModalIsOpen(false);
    else navigate("/home");
  };

  const createChat = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: user._id,
          receiverId: selectedUsers,
        }),
      });
      const newChat = await response.json();
      setCurrentChat(newChat);
      console.log("chat created", newChat);
    } catch (error) {
      console.log(error);
    }
    navigate("/chat");
  };

  // testdata
  // const user = {
  //   friends: [
  //     { user: { userName: "testBuddy" }, accepted: true },
  //     { user: { userName: "secondTester" }, accepted: false },
  //     { user: { userName: "testerThirddy" }, accepted: true },
  //   ],
  // };
  // console.log(foundUsers);
  // return (
  //   <>
  //     <div className="container friends__page">
  //       <div className="title_wrapper">
  //         <h1 className="title">Friends</h1>
  //         <Link className="close_btn">
  //           <CloseIcon func={handleClose} />
  //         </Link>
  //       </div>
  //       <form className="first_element" onSubmit={handelUserSearch}>
  //         <div className="friends__search-wrapper">
  //           <input
  //             ref={searchInputRef}
  //             type="text"
  //             placeholder="search users"
  //             value={searchInput}
  //             onChange={(e) => setSearchInput(e.target.value)}
  //           />
  //           <button type="submit">
  //             <SearchIcon />
  //           </button>
  //           {inviteUserModalIsOpen && (
  //             <InviteFriendsModal
  //               setInviteUserModalIsOpen={setInviteUserModalIsOpen}
  //               foundUsers={foundUsers}
  //               modalRef={modalRef}
  //               token={token}
  //               user={user}
  //               setSearchInput={setSearchInput}
  //               searchInput={searchInput}
  //               setUser={setUser}
  //             />
  //           )}
  //         </div>
  //         <ButtonHallow txt="Send Invitation" type="submit"></ButtonHallow>
  //       </form>
  //       <form className="friends__page-group-form">
  //         <Button txt="Create Group Chat" />
  //         <Button txt="Create Travel Plan" />
  //         <fieldset className="friends__page-friends-wrapper">
  //           {user &&
  //             user.friends.length > 0 &&
  //             user.friends.map((friend, index) =>
  //               friend.accepted ? (
  //                 <div
  //                   className="friends__page-check-wrapper"
  //                   key={friend.user.userName + index}
  //                 >
  //                   <div
  //                     className={`${
  //                       selectedUsers.includes(friend.user.userName)
  //                         ? "btn--friends"
  //                         : "btn_hallow--friends"
  //                     }`}
  //                     // htmlFor={friend.user.userName}
  //                   >
  //                     {friend.user.name}
  //                   </div>
  //                   <input
  //                     className="friends__page-checkbox"
  //                     type="checkbox"
  //                     name={friend.user.userName}
  //                     id={friend.user.userName}
  //                     onChange={handleFriendCheckbox}
  //                   />
  //                 </div>
  //               ) : null
  //             )}
  //         </fieldset>
  //       </form>
  //     </div>
  //   </>
  // );
  // console.log("friends: ", user);
  return {
    friendsRef,
    renderFriendsPage: (
      <>
        <div className="navigation_wrapper">
          <div
            ref={friendsRef}
            className="navigation_wrapper_body navigaton_page_not_visible"
          >
            <div className="navigation_wrapper_body_header">
              <h1 className="title">Friends</h1>
              <button
                className="navigation_close_btn"
                onClick={() => {
                  closeMenu(friendsRef);
                  closeTopMenu();
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <form
              className="navigation_wrapper_body_content"
              onSubmit={handelUserSearch}
            >
              <div className="friends__search-wrapper">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="search users"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit">
                  <SearchIcon />
                </button>
                {inviteUserModalIsOpen && (
                  <InviteFriendsModal
                    setInviteUserModalIsOpen={setInviteUserModalIsOpen}
                    foundUsers={foundUsers}
                    modalRef={modalRef}
                    token={token}
                    user={user}
                    setSearchInput={setSearchInput}
                    searchInput={searchInput}
                    setUser={setUser}
                  />
                )}
              </div>
              <ButtonHallow txt="Send Invitation" type="submit"></ButtonHallow>
            </form>
            {/* start of content of navigation page */}
            <form className="navigation_wrapper_body_content">
              <Button
                txt="Start chat with selected friends"
                func={createChat}
              />
              <Button txt="Create Travel Plan" />
              <fieldset className="friends__page-friends-wrapper">
                {user &&
                  user?.friends.map((friend, index) =>
                    user?.friends.length > 0 &&
                    friend.accepted &&
                    friend.user ? (
                      <div
                        className="friends__page-check-wrapper"
                        key={friend?.user?.userName + index}
                      >
                        <div
                          className={`${
                            selectedUsers.includes(friend?.user?.userName)
                              ? "btn--friends"
                              : "btn_hallow--friends"
                          }`}
                          // htmlFor={friend.user.userName}
                        >
                          {friend.user?.name}
                        </div>
                        <input
                          className="friends__page-checkbox"
                          type="checkbox"
                          name={friend.user?.userName}
                          id={friend.user?._id}
                          onChange={handleFriendCheckbox}
                        />
                      </div>
                    ) : null
                  )}
              </fieldset>
            </form>
            {/* end of content of navigation page */}
          </div>
        </div>
      </>
    ),
  };
}
