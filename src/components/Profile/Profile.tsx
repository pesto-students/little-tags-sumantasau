import React, { useState, useRef } from "react";
import { AVATAR_IMAGE } from "../../assets";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./Profile.scss";
import { STATIC_DATA, SessionKeys } from "../../config/StaticData";

//AFTER LOGIN, SESSION NEEDS TO SET
sessionStorage.setItem(SessionKeys.USERNAME, "XXXXXX XXXXX");

const initLocalStorage = (
  userName: string,
  userEmail: string,
  userMobile: string
) => {
  window.localStorage.setItem("NAME", userName);
  window.localStorage.setItem("EMAIL", userEmail);
  window.localStorage.setItem("MOBILE", userMobile);
};

export default function Profile() {
  const [userName, setuserName] = useLocalStorage("NAME", "XXXXXX XXXXX");
  const [userMobile, setuserMobile] = useLocalStorage("MOBILE", "");
  const [userEmail, setuserEmail] = useLocalStorage("EMAIL", "");

  const {
    ENGLISH: {
      UserProfile: {
        USERNAME_PLACEHOLDER,
        USEREMAIL_PLACEHOLDER,
        USERMOBILE_PLACEHOLDER,
        AVATAR_ALT_TAG,
      },
    },
  } = STATIC_DATA;

  const inputFile = useRef<HTMLInputElement>(null);

  const [isInputForData, setisInputForData] = useState("");
  const logUserName = sessionStorage.getItem(SessionKeys.USERNAME) ?? "";

  const onSaveProfileClick = () => {
    initLocalStorage(userName, userEmail, userMobile);
  };
  const makeDataEditable = (inputValue: string) => {
    if (logUserName === userName) {
      setisInputForData(inputValue);
    }
  };

  const onImageClick = () => {
    if (inputFile.current !== null) {
      inputFile.current.click();
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-left">
        <img
          src={AVATAR_IMAGE}
          className="profile-image"
          alt={AVATAR_ALT_TAG}
          onClick={onImageClick}
        />
        <input
          type="file"
          id="file"
          ref={inputFile}
          className="profile-input-file"
        />
      </div>
      <div className="profile-main">
        <ul>
          <li>
            {(isInputForData && isInputForData === "username") || !userName ? (
              <div className="profile-input-container">
                <input
                  type="text"
                  value={userName}
                  className="profile-form-field-textbox"
                  placeholder={USERNAME_PLACEHOLDER}
                  onChange={(event) => {
                    setuserName(event.target.value);
                  }}
                  required
                />
              </div>
            ) : (
              <div
                className="profile-form-field-name"
                onClick={() => makeDataEditable("username")}
              >
                {userName}
              </div>
            )}
          </li>
          <li>
            {(isInputForData && isInputForData === "useremail") ||
            !userEmail ? (
              <div className="profile-input-container">
                <input
                  type="text"
                  value={userEmail}
                  className="profile-form-field-textbox"
                  placeholder={USEREMAIL_PLACEHOLDER}
                  onChange={(event) => {
                    setuserEmail(event.target.value);
                  }}
                  required
                />
              </div>
            ) : (
              <div
                className="profile-form-field-name"
                onClick={() => makeDataEditable("useremail")}
              >
                {userEmail}
              </div>
            )}
          </li>
          <li>
            {(isInputForData && isInputForData === "usermobile") ||
            !userMobile ? (
              <div className="profile-input-container">
                <input
                  type="text"
                  value={userMobile}
                  className="profile-form-field-textbox"
                  placeholder={USERMOBILE_PLACEHOLDER}
                  onChange={(event) => {
                    setuserMobile(event.target.value);
                  }}
                  required
                />
              </div>
            ) : (
              <div
                className="profile-form-field-name"
                onClick={() => makeDataEditable("usermobile")}
              >
                {userMobile}
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className="profile-right">
        <input
          type="button"
          className="profile-form-field-button profile-form-field-button-disable"
          onClick={onSaveProfileClick}
          value="Save Profile"
          disabled={!logUserName}
        />
      </div>
    </div>
  );
}
