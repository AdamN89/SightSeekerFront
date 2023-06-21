import "./settings.css";
import { useState } from "react";
import ButtonDelete from "../../components/ButtonDelete";

export default function Settings() {
  return (
    <>
      <div className="center settings_page_flex_collumn">
        <h1>Settings</h1>
        <div className="user-settings settings_page_flex">
          <div className="settings_page_flex_collumn">
            <span className="small-dark">name</span>
            <span>Miroslav Ljubicic</span>
            <span className="small-dark">user name</span>
            <span>mrkyns</span>
            <span className="small-dark">email</span>
            <span>mrkyns@gmail.com</span>
            <span className="small-dark">password</span>
            <span>xxxxxxxx</span>
          </div>
          <div className="avatar">
            <img src="https://fakeimg.pl/150x150" />
          </div>
        </div>
        <h2>Customise</h2>
        <div className="settings_page_flex">
          <h3>Darkmode</h3>
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>

        <h2>Privacy</h2>
        <div>
          <div className="settings_page_flex">
            <h3>Can be found by</h3>
            <div className="settings_page_flex">
              <label class="settings_container">
                All
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>

              <label class="settings_container">
                Friends
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>

              <label class="settings_container">
                None
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div className="settings_page_flex">
            <h3>Location Services</h3>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div className="settings_page_flex">
            <h3>Show email</h3>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div className="settings_page_flex">
            <h3>Show name</h3>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div>
          <ButtonDelete txt={"delete account"} func={null} />
        </div>
      </div>
    </>
  );
}
