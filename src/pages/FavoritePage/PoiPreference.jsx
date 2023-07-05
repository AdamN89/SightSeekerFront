import { useNavigate } from "react-router";
import CloseIcon from "../../components/CloseIcon";
import Button from "../../components/Button";
import DeleteIcon from "../../components/DeleteIcon";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import { async } from "react-input-emoji";

export default function PoiPreference() {
  const { token, user, backendURL, setUser } = useContext(AuthContext);
  const [newPOI, setNewPOI] = useState("");
  const [reload, setReload] = useState();

  const favoritesRef = useRef(null);
  const navigate = useNavigate();

  console.log(user);

  const handleAddPOI = async (e) => {
    try {
      e.preventDefault();
      if (!newPOI) return alert("Please say sth");
      const response = await fetch(`${backendURL}/user/addPOI`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          _id: user._id,
          filterPOI: newPOI,
        }),
      });
      if (response.ok) {
        const { data } = await response.json();
        setUser(data);
      } else {
        console.log("Error");
      }
      setNewPOI("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleDeletePOI = async (filter) => {
    try {
      const response = await fetch(`${backendURL}/user/deletePOI`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          filter,
        }),
      });
      if (response.ok) {
        const { data } = await response.json();
        setUser(data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="container add_favorite">
      <button
        className="add_favorite_close_btn"
        onClick={() => navigate("/home")}
      >
        <CloseIcon />
      </button>
      <h1 className="title">Filter by Preference</h1>
      <div className="first_element">
        <form className="add_favorite_form">
          <input
            type="text"
            value={newPOI}
            placeholder="castle, museum, beach, ..."
            onChange={(e) => {
              setNewPOI(e.target.value);
            }}
          />
          <Button txt={"add"} func={handleAddPOI} key="createfavorite" />
        </form>
      </div>
      <div className="second_element">
        {user?.settings.poi?.length > 0 &&
          user?.settings.poi?.map((filter, index) => (
            <div className="favorites_page">
              <span>{filter}</span>
              <div
                className="favorites_page_icons"
                onClick={() => handleDeletePOI(filter)}
              >
                <DeleteIcon />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
