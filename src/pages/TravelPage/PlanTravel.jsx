import CloseIcon from "../../components/CloseIcon";
import DeleteIcon from "../../components/DeleteIcon";
import TopMenu from "../../components/TopMenu/TopMenu";
import "./TravelsPage.css";

export default function PlanTravel() {
  return (
    <>
      {/* <TopMenu /> */}
      <div className="plan_travel_header">
        <h1>Travel plan name</h1>
        <div className="plan_travel_close_btn">
          <CloseIcon />
        </div>
      </div>
      <div className="plan_travel">
        <input type="text" placeholder="search places" />
        <div className="plan_travel_pois">
          <div className="plan_travel_poi">
            <span>poi name 01</span>
            <button>
              <DeleteIcon />
            </button>
          </div>
          <div className="plan_travel_poi">
            <span>poi name 02</span>
            <button>
              <DeleteIcon />
            </button>
          </div>
          <div className="plan_travel_poi">
            <span>poi name 03</span>
            <button>
              <DeleteIcon />
            </button>
          </div>
          <div className="plan_travel_poi">
            <span>poi name 04</span>
            <button>
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
