import { useContext, useEffect, useState } from "react";
import SearchIcon from "../../components/SearchIcon";
import "./FriendsPage.css";
import { AuthContext } from "../../context/AuthContext";

export default function InviteFriendsModal({
  foundUsers,
  setSearchInput,
  searchInput,
}) {
  const { user, token, setUser, backendURL } = useContext(AuthContext);
  const [invitationsSend, setInvitationsSend] = useState([]);
  const [invitationsReceived, setInvitationsReceived] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const invitedFriends = user.friends.map(
      (user) => user.user && !user.received && user.user.userName
    );
    const beingInvitedBy = user.friends.map(
      (user) => user.received && !user.accepted && user.user.userName
    );
    setInvitationsSend(invitedFriends);
    setInvitationsReceived(beingInvitedBy);
  }, [user]);

  const handleInvitation = async (e) => {
    const invitedUserID = e.target.id;
    if (e.target.checked) {
      const res = await fetch(`${backendURL}/user/invite/${invitedUserID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        console.error(data.error);
      }
      if (res.ok) setUser(data.data);
    }
    if (!e.target.checked) {
      const res = await fetch(`${backendURL}/user/answer-invitation`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          invitingUserId: invitedUserID,
          accepted: false,
          received: false,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        console.error(data.error);
      }
      if (res.ok) setUser(data.data);
    }
  };
  // console.log("from modal - found users: ", foundUsers);
  // console.log("from modal - user: ", user);
  // console.log("invitedFriends: ", invitationsSend);

  return (
    <div className="invite-friends">
      <input
        type="text"
        placeholder="search users"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button type="submit">
        <SearchIcon />
      </button>
      {foundUsers &&
        foundUsers.length > 0 &&
        foundUsers.map((friend, index) => (
          <div
            className="friends__page-check-wrapper"
            key={friend.userName + index + "-modal"}
          >
            <div
              className={`${
                invitationsSend.includes(friend.userName)
                  ? "btn--friends"
                  : "btn_hallow--friends"
              }`}
              // htmlFor={friend.user.userName}
            >
              {friend.name}
            </div>
            <input
              className="friends__page-checkbox"
              type="checkbox"
              name={friend.userName}
              id={friend._id}
              onChange={handleInvitation}
              defaultChecked={
                invitationsSend.includes(friend.userName) ||
                invitationsReceived.includes(friend.userName)
              }
            />
          </div>
        ))}
    </div>
  );
}
