import "./TravelsPage.css";
import { Navigate, useNavigate } from "react-router";
import CloseIcon from "../../components/CloseIcon";
import Button from "../../components/Button";
import MapContent from "../../components/Map/MapContent";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { async } from "q";

export default function CreateTravelPlan() {
  const navigate = useNavigate();

  const membersDialog = useRef(null);
  const selectedPointsDialog = useRef(null);
  const { user, backendURL, token } = useContext(AuthContext);

  const [openDrop1, setOpenDrop1] = useState(false);
  const [openDrop2, setOpenDrop2] = useState(false);

  const [friends, setFriends] = useState([]);
  const [name, setName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [bookmarks, setBookmarks] = useState();
  const [selectedBookmarks, setSelectedBookmarks] = useState([]);

  const [userCoords, setUserCoords] = useState({});
  const [viewState, setViewState] = useState({
    longitude: 13.540060456464587,
    latitude: 52.45685631705479,
    zoom: 15,
  });

  useEffect(() => {
    if (user) {
      setFriends(user.friends);
      setBookmarks(user.favorites);
    }
  }, []);

  console.log(user);
  console.log(name);

  useEffect(() => {
    if (!user) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setViewState({
          ...viewState,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: 9,
        });
        setUserCoords({
          ...userCoords,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: 9,
        });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, [user]);

  const handleCloseModel = () => {
    setOpenDrop1(false);
    setOpenDrop2(false);
    membersDialog.current.close();
    selectedPointsDialog.current.close();
  };

  const handleFriendCheckbox = (e) => {
    if (e.target.checked) setSelectedFriends((prev) => [...prev, e.target.id]);
    if (!e.target.checked)
      setSelectedFriends((prev) =>
        prev.filter((friend) => friend !== e.target.id)
      );
  };

  const handleBookmarkCheckbox = (e) => {
    if (e.target.checked)
      setSelectedBookmarks((prev) => [...prev, e.target.id]);
    if (!e.target.checked)
      setSelectedBookmarks((prev) =>
        prev.filter((bookmark) => bookmark !== e.target.id)
      );
  };

  const handleClick = (event) => {
    console.log("handleclick triggered");
    event.preventDefault();
    console.log(event.target.innerHTML);
    if (event.target.innerHTML === "add members") {
      console.log("add members");
      if (openDrop1) {
        membersDialog.current.close();
      } else {
        membersDialog.current.show();
      }
      setOpenDrop1(!openDrop1);
      setOpenDrop2(false);
    }
    if (event.target.innerHTML === "select from bookmarks") {
      if (openDrop1) {
        selectedPointsDialog.current.close();
      } else {
        selectedPointsDialog.current.show();
      }
      setOpenDrop1(false);
      setOpenDrop2(!openDrop2);
    }
  };

  const saveNewTravelPlan = async () => {
    console.log(name);
    if (name) {
      try {
        const response = await fetch(`${backendURL}/travelplan/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            startDate,
            endDate,
            members: selectedFriends,
            selectedPoints: selectedBookmarks,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          navigate("/home");
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.error("Error", error);
      }
    } else {
      alert("name is required");
    }
  };

  return (
    <>
      <div
        className={openDrop1 || openDrop2 ? "showClickAway" : "hide"}
        onClick={handleCloseModel}
      ></div>
      <div className="container create_travel_plan">
        <button
          className="create_travel_plan_close_btn"
          onClick={() => navigate("/home")}
        >
          <CloseIcon />
        </button>
        <h1 className="title">Create Plan</h1>
        <div className="first_element">
          <form className="create_travel_plan_form">
            <input
              type="text"
              placeholder="travel plan name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="create_travel_plan_time">
              <input
                type="date"
                className="edit_travel_plan_time_picker"
                placeholder="start date"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
              <input
                type="date"
                className="edit_travel_plan_time_picker"
                placeholder="end date"
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </div>
            <Button txt="add members" func={handleClick} name="addMembers" />
            <Button
              txt="select from bookmarks"
              func={handleClick}
              name="addFromBookmarks"
            />
            {/* <input type="text" placeholder="search places" /> */}
          </form>
          <dialog ref={membersDialog} className={openDrop1 ? "modal" : null}>
            <div className="edit_travel_plan_modal_header">
              <h2 className="title">Add member</h2>
              <CloseIcon func={handleCloseModel} />
            </div>
            <div className="edit_travel_plan_modal">
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
                        className="edit_travel_plan_checkbox"
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
          <dialog
            ref={selectedPointsDialog}
            className={openDrop2 ? "modal" : null}
          >
            <div className="edit_travel_plan_modal_header">
              <h2 className="title">Add bookmarks</h2>
              <CloseIcon func={handleCloseModel} />
            </div>
            <div className="edit_travel_plan_modal">
              {bookmarks?.length > 0 &&
                bookmarks?.map((bookmark, index) => (
                  <div
                    className="friends__page-check-wrapper"
                    key={bookmark?.name + index}
                  >
                    <div
                      className={`${
                        selectedBookmarks?.includes(bookmark?._id)
                          ? "btn--friends"
                          : "btn_hallow--friends"
                      }`}
                    >
                      {bookmark.name}
                    </div>
                    <input
                      className="edit_travel_plan_checkbox"
                      type="checkbox"
                      name={bookmark.name}
                      id={bookmark._id}
                      onChange={handleBookmarkCheckbox}
                    />
                  </div>
                ))}
            </div>
            <div className="friends__search-wrapper"></div>
          </dialog>
        </div>
        <div className="second_element">
          <h4>Select from Map</h4>
          <div className="create_travel_plan_map">
            <MapContent
              viewState={viewState}
              setViewState={setViewState}
              userCoords={userCoords}
              parent={"CreateTravelPlan"}
            />
          </div>
          <Button
            txt={"Create travel plan"}
            func={saveNewTravelPlan}
            key="createtravelplan"
          />
        </div>
      </div>
    </>
  );
}
