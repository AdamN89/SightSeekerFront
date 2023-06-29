import InvitationsGraphic from "../../components/InvitationsGraphic";
import HandshakeGraphic from "../../components/HandshakeGraphic";
import Button from "../../components/Button";
import ButtonDelete from "../../components/ButtonDelete";
import "./ReceivedInvitations.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReceivedInvitation() {
  const [invitationsStack, setInvitationsStack] = useState([]);
  const [queuedUser, setQueuedUser] = useState(null);
  const [error, setError] = useState(null);
  const [firstRun, setFirstRun] = useState(true);
  const { token, user, setUser, backendURL } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(token);

  useEffect(() => {
    const invitations = user.friends.filter((friend) => friend.received);
    setInvitationsStack(invitations);
    if (invitations.length === 0) navigate("/home");
  }, [user]);

  useEffect(() => {
    if (invitationsStack.length || firstRun) {
      setQueuedUser(invitationsStack[invitationsStack.length - 1]);
      setFirstRun(false);
    } else navigate("/home");
  }, [invitationsStack]);

  // console.log("invitationsStack: ", invitationsStack);
  console.log("queuedUser: ", queuedUser);

  const handleAccept = async () => {
    const res = await fetch(`${backendURL}/user/answer-invitation`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        invitingUserId: queuedUser.user._id,
        accepted: true,
        received: true,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      console.error(data.error);
    }
    if (res.ok) {
      console.log("from pos res - user: ", data.data);
      setUser(data.data);
      setInvitationsStack((prev) => prev.slice(0, -1));
      if (invitationsStack.length > 1) {
        setQueuedUser(invitationsStack[invitationsStack.length - 2]);
      } else {
        setQueuedUser(null);
      }
    }
  };
  const handleReject = async () => {
    const res = await fetch(`${backendURL}/user/answer-invitation`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        invitingUserId: queuedUser.user._id,
        accepted: false,
        received: true,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      console.error(data.error);
    }
    if (res.ok) setUser(data.data);
    setInvitationsStack((prev) => prev.slice(0, -1));
    if (invitationsStack.length > 1) {
      setQueuedUser(invitationsStack[invitationsStack.length - 2]);
    } else {
      setQueuedUser(null);
    }
  };

  return (
    <div className="container ">
      <div className="first_element invitations">
        <div className="relative">
          <h1 className="title">Invitation</h1>
          <div className="invitations__count">{invitationsStack.length}</div>
        </div>
        <InvitationsGraphic />
        <p>
          You have received an invitation to join and share your adventures
          with:
        </p>
      </div>
      <div className="second_element">
        <div className="invitations__profile-group">
          <HandshakeGraphic />
          <div className="invitations__profiles">
            <div className="invitations__inviting">
              {queuedUser && invitationsStack.length > 0 && (
                <>
                  <img
                    className="invitations__avatar"
                    src={queuedUser.user.avatar}
                    alt={queuedUser.user.username}
                  />
                  <h3>{queuedUser.user.name}</h3>
                </>
              )}
            </div>
            <div className="invitations__user">
              <h3>{user.name}</h3>
              <img
                className="invitations__avatar"
                src={user.avatar}
                alt={user.userName}
              />
            </div>
          </div>
        </div>
        <div className="invitations__btn-group">
          <Button txt="accept" func={handleAccept} />
          <ButtonDelete txt="reject" func={handleReject} />
        </div>
      </div>
    </div>
  );
}
