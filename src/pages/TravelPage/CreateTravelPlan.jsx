import "./TravelsPage.css";
import { useNavigate } from "react-router";
import CloseIcon from "../../components/CloseIcon";
import Button from "../../components/Button";



export default function CreateTravelPlan() {
  const navigate = useNavigate();

  return (
    <div className="container create_travel_plan">
      <button
        className="create_travel_plan_close_btn"
        onClick={() => navigate("/home")}
      >
        <CloseIcon />
      </button>
      <h1 className="title">Create Travel Plan</h1>
      <div className="first_element">
        <form className="create_travel_plan_form">
          <input type="text" placeholder="travel plan name" />
          <div className="create_travel_plan_time">
            <input type="text" placeholder="start date" />
            <input type="text" placeholder="end date" />
          </div>
          <input type="text" placeholder="search places" />
          <input type="text" placeholder="members" />
          <input type="text" placeholder="favorites" />
        </form>
      </div>
      <div className="second_element">
        <div className="create_travel_plan_map"></div>
        <Button txt={"Create travel plan"} func={""} key="createtravelplan" />
      </div>
    </div>
  );
}
