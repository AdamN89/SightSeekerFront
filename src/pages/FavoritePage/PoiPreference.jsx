import { useNavigate } from "react-router";
import CloseIcon from "../../components/CloseIcon";
import Button from "../../components/Button";
import DeleteIcon from "../../components/DeleteIcon";

export default function PoiPreference() {
  const navigate = useNavigate();
  return (
    <div className="container add_favorite">
      <button
        className="add_favorite_close_btn"
        onClick={() => navigate("/home")}
      >
        <CloseIcon />
      </button>
      <h1 className="title">POI Preference</h1>
      <div className="first_element">
        <form className="add_favorite_form">
          <input type="text" placeholder="castle, museum, beach, ..." />
        </form>
        <Button txt={"add"} func={null} key="createfavorite" />
      </div>
      <div className="second_element">
        <div className="favorites_page">
          <span>Entertainment</span>
          <div className="favorites_page_icons">
            <DeleteIcon />
          </div>
        </div>
        <div className="favorites_page">
          <span>Castle</span>
          <div className="favorites_page_icons">
            <DeleteIcon />
          </div>
        </div>
        <div className="favorites_page">
          <span>Museum</span>
          <div className="favorites_page_icons">
            <DeleteIcon />
          </div>
        </div>
        <div className="favorites_page">
          <span>Bar</span>
          <div className="favorites_page_icons">
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
