import { useNavigate } from "react-router";
import CloseIcon from "../../components/CloseIcon";
import Button from "../../components/Button";
import DeleteIcon from "../../components/DeleteIcon";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";

export default function PoiPreference() {
  const { token, user, backendURL } = useContext(AuthContext);

  const [filter, setFilter] = useState(["Hi (hardcoded)", "beach (hardcoded)"]);

  const favoritesRef = useRef(null);
  const navigate = useNavigate();

  console.log(user);
  console.log(filter);

  // useEffect(() => {
  //   if (user) {
  //     setFilter(user.settings.poi);
  //   }
  // }, []);

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
          <input type="text" placeholder="castle, museum, beach, ..." />
        </form>
        <Button txt={"add"} func={null} key="createfavorite" />
      </div>
      <div className="second_element">
        {filter?.length > 0 &&
          filter?.map((filter, index) => (
            <div className="favorites_page">
              <span>{filter}</span>
              <div className="favorites_page_icons">
                <DeleteIcon />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
