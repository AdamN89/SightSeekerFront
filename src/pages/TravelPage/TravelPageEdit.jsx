import "./TravelsPage.css";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect, useContext, useRef } from "react";
import CloseIcon from "../../components/CloseIcon";
import Button from "../../components/Button";
import { AuthContext } from "../../context/AuthContext";

export default function EditTravelPlan() {
  const navigate = useNavigate();

  const membersDialog = useRef(null);
  const [openDrop, setOpenDrop] = useState(false);
  const [currentTravelplan, setCurrentTravelplan] = useState();
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [name, setName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { token, user, backendURL } = useContext(AuthContext);
  const { _id } = useParams();

  const handleAddMembers = (event) => {
    event.preventDefault();
    membersDialog.current.show();
    setOpenDrop(true);
  };

  const handleCloseModel = () => {
    setOpenDrop(false);
    membersDialog.current.close();
  };

  const handleFriendCheckbox = (e) => {
    if (e.target.checked) setSelectedFriends((prev) => [...prev, e.target.id]);
    if (!e.target.checked)
      setSelectedFriends((prev) =>
        prev.filter((friend) => friend !== e.target.id)
      );
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${backendURL}/travelplan/edit/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          _id,
          name,
          startDate,
          endDate,
          members: selectedFriends,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const getTravelplan = async () => {
    try {
      const response = await fetch(`${backendURL}/travelplan/${_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentTravelplan(data.data);
        console.log(data.data);
        setFriends(user.friends);
        setName(data.data.name);
        setStartDate(data.data.dates.startDate);
        setEndDate(data.data.dates.endDate);
        const filteredFriends = user.friends
          .map((friend) => {
            if (data.data.members.includes(friend._id)) {
              return friend._id;
            }
          })
          .filter((friend) => friend !== undefined);
        setSelectedFriends(filteredFriends);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getTravelplan();
  }, []);

  return currentTravelplan ? (
    <>
      <div
        className={openDrop ? "showClickAway" : "hide"}
        onClick={handleCloseModel}
      ></div>
      <div className="container create_travel_plan">
        <button
          className="create_travel_plan_close_btn"
          onClick={() => navigate("/home")}
        >
          <CloseIcon />
        </button>
        <h1 className="title">Edit Travel Plan</h1>
        <div className="first_element">
          <form className="create_travel_plan_form">
            <input
              type="text"
              placeholder={currentTravelplan.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="create_travel_plan_time">
              <input
                type="date"
                defaultValue={currentTravelplan.dates.startDate.slice(0, 10)}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
              <input
                type="date"
                defaultValue={currentTravelplan.dates.endDate.slice(0, 10)}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </div>
            <Button txt="add members" func={handleAddMembers} />
          </form>
          <dialog ref={membersDialog} className={openDrop ? "modal" : null}>
            <div>
              <h2 className="title">Add member</h2>
              <CloseIcon func={handleCloseModel} />
            </div>
            <div className="friends__page-friends-wrapper">
              {friends?.length > 0 &&
                friends?.map((friend, index) =>
                  friend.accepted && friend.user ? (
                    <div
                      className="friends__page-check-wrapper"
                      key={friend?.user?.userName + index}
                    >
                      <div
                        className={`${
                          selectedFriends?.includes(friend?._id)
                            ? "btn--friends"
                            : "btn_hallow--friends"
                        }`}
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
            </div>
            <div className="friends__search-wrapper"></div>
          </dialog>
        </div>
        <div className="second_element">
          <div className="create_travel_plan_map"></div>
          <Button
            txt={"Save Travel Plan"}
            func={handleSaveChanges}
            key="savetravelplan"
          />
        </div>
      </div>
    </>
  ) : null;
}
