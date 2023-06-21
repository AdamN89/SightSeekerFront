import "./settings.css";
import { useState } from "react";

export default function Settings() {
  return (<>
    <div className="center flex-collumn">
      <h1>Settings</h1>
      <div className="user-settings flex">
        <div className="flex-collumn">
          <span className="small-dark">name</span>
          <span>Miroslav Ljubicic</span>
          <span className="small-dark">user name</span>
          <span>mrkyns</span>
          <span className="small-dark">email</span>
          <span>mrkyns@gmail.com</span>
          <span className="small-dark">password</span>
          <span>xxxxxxxx</span>
        </div>
        <div className="avatar"><img src="https://fakeimg.pl/150x150"/></div>
      </div>
      <h2>Customise</h2>
      <div className="flex">
            <h3>Darkmode</h3>
            <label class="switch">
              <input type="checkbox"/>
              <span class="slider round"></span>
            </label>
        </div>

      <h2>Privacy</h2>
      <div>
        <div className="flex">
          <h3>Can be found by</h3>
            <div className="flex">
              <label class="container">All
                <input type="checkbox"/>
                <span class="checkmark"></span>
              </label>

              <label class="container">Friends
                <input type="checkbox"/>
                <span class="checkmark"></span>
              </label>

              <label class="container">
                None
                <input type="checkbox"/>
                <span class="checkmark"></span>
              </label>
            </div>
        </div>
        <div className="flex">
            <h3>Location Services</h3>
            <label class="switch">
              <input type="checkbox"/>
              <span class="slider round"></span>
            </label>
        </div>
        <div className="flex">
            <h3>Show email</h3>
            <label class="switch">
              <input type="checkbox"/>
              <span class="slider round"></span>
            </label>
        </div>
        <div className="flex">
            <h3>Show name</h3>
            <label class="switch">
              <input type="checkbox"/>
              <span class="slider round"></span>
            </label>
        </div>
      </div>
      <div>
        <button className="btn warning-btn" type="button">DELETE ACCOUNT</button>
      </div>
    </div>
  </>);
}
