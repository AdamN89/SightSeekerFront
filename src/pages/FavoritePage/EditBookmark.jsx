import { useNavigate } from "react-router-dom";
import CloseIcon from "../../components/CloseIcon";
import Button from "../../components/Button";
import ButtonDelete from "../../components/ButtonDelete";

export default function EditBookmark() {
  const navigate = useNavigate();
  return (
    <div className="container add_favorite">
      <button
        className="add_favorite_close_btn"
        onClick={() => navigate("/home")}
      >
        <CloseIcon />
      </button>
      <h1 className="title">Edit bookmark</h1>
      <div className="first_element">
        <div className="add_favorite_map"></div>
        <Button txt={"Edit name"} func={null} key="renamebookmark" />
        <ButtonDelete
          txt={"Remove bookmark"}
          func={null}
          key="removebookmark"
        />
      </div>
    </div>
  );
}
