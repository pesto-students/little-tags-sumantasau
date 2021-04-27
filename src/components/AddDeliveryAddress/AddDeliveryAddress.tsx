import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./AddDeliveryAddress.scss";
import { CONFIG } from "../../config/Config";
import { STATIC_DATA, TEST_DATA } from "../../config/StaticData";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function AddDeliveryAddress() {
  const {
    ENGLISH: {
      DeliveryAddress: {
        ADD_DELIVERYADDRESS_HEADING,
        FIRSTNAME_TEXT,
        FIRSTNAME_PLACEHOLDER,
        LASTNAME_TEXT,
        LASTNAME_PLACEHOLDER,
        MOBILE_TEXT,
        MOBILE_PLACEHOLDER,
        ADDRESS_LINE1_TEXT,
        ADDRESS_LINE1_PLACEHOLDER,
        ADDRESS_LINE2_TEXT,
        ADDRESS_LINE2_PLACEHOLDER,
        STATE_TEXT,
        STATE_PLACEHOLDER,
        CITY_TEXT,
        CITY_PLACEHOLDER,
        PINCODE_TEXT,
        PINCODE_PLACEHOLDER,
      },
    },
  } = STATIC_DATA;

  const { STATE_DATA, CITY_DATA } = TEST_DATA;

  const {
    ROUTES: { DELIVERY_ADDRESS },
  } = CONFIG;

  const [City, setCity] = useState<any>([]); 
  const [DELIVERY_ADDRESS_DATA, setDELIVERY_ADDRESS_DATA] = useLocalStorage("DELIVERY_ADDRESS_DATA",[]) ;

  const [userFirstName, setuserFirstName] = useState("");
  const [userLastName, setuserLastName] = useState("");
  const [userAddress1, setuserAddress1] = useState("");
  const [userAddress2, setuserAddress2] = useState("");
  const [userStateName, setuserStateName] = useState("");
  const [userCityName, setuserCityName] = useState("");
  const [userMobile, setuserMobile] = useState("");
  const [userPincode, setuserPincode] = useState("");
  const [userDefaultAddress, setuserDefaultAddress] = useState(false);

  const history = useHistory();


  const handleStateSelect = (event: any) => {
    const index = event.nativeEvent.target.selectedIndex;
    setuserStateName(event.nativeEvent.target[index].text);

    const CityData = CITY_DATA.filter(
      (stateselected) => stateselected.stateId === parseInt(event.target.value)
    );
    setCity(CityData);
  };

  const handleCitySelect = (event: any) => {
    const index = event.nativeEvent.target.selectedIndex;   
    setuserCityName(event.nativeEvent.target[index].text);
  }

  const onSaveClick = () =>{
    if(userFirstName && userLastName && userAddress1 && userStateName && userPincode) {
      let addressId = DELIVERY_ADDRESS_DATA.length + 1;
      DELIVERY_ADDRESS_DATA.push({
        id:addressId,
        name : userFirstName + ' ' + userLastName,
        address: userAddress1 + ' ' + userAddress2,
        state : userStateName,
        city : userCityName,
        pincode : userPincode,
        mobile : userMobile,
        isDefault : userDefaultAddress
      });
      setDELIVERY_ADDRESS_DATA(DELIVERY_ADDRESS_DATA);
      window.localStorage.setItem("DELIVERY_ADDRESS_DATA", JSON.stringify(JSON.stringify(DELIVERY_ADDRESS_DATA)));    
      history.push(DELIVERY_ADDRESS);
    }
  }

  

  const onCancelClick = () => {
    history.push(DELIVERY_ADDRESS);
  };

  return (
    <div id="add-delivery-address-container">
      <h3>{ADD_DELIVERYADDRESS_HEADING}</h3>
      <div className="left">
        <p className="input-heading">{FIRSTNAME_TEXT}</p>
        <input
          type="text"
          className="input-box"
          placeholder={FIRSTNAME_PLACEHOLDER}
          value={userFirstName}
                onChange={(event) => {
                  setuserFirstName(event.target.value);                 
                }}
          required
        />

        <p className="input-heading">{ADDRESS_LINE1_TEXT}</p>
        <input
          type="text"
          className="input-box"
          placeholder={ADDRESS_LINE1_PLACEHOLDER}
          value={userAddress1}
          onChange={(event) => {
            setuserAddress1(event.target.value);                 
          }}
          required
        />

        <p className="input-heading">{STATE_TEXT}</p>
        <select onChange={handleStateSelect}>
          <option>{STATE_PLACEHOLDER}</option>
          {STATE_DATA.sort((a, b) => (a.name > b.name ? 1 : -1)).map(
            (State, i) => (
              <option value={State.id}>{State.name}</option>
            )
          )}
        </select>

        <p className="input-heading">{MOBILE_TEXT}</p>
        <input
          type="text"
          className="input-box"
          placeholder={MOBILE_PLACEHOLDER}
          value={userMobile}
          onChange={(event) => {
            setuserMobile(event.target.value);                 
          }}
          maxLength={10}
          required
        />
      </div>
      <div className="right">
        <p>{LASTNAME_TEXT}</p>
        <input
          type="text"
          className="input-box"
          placeholder={LASTNAME_PLACEHOLDER}
          value={userLastName}
          onChange={(event) => {
            setuserLastName(event.target.value);                 
          }}
          required
        />

        <p>{ADDRESS_LINE2_TEXT}</p>
        <input
          type="text"
          className="input-box"
          placeholder={ADDRESS_LINE2_PLACEHOLDER}
          value={userAddress2}
          onChange={(event) => {
            setuserAddress2(event.target.value);                 
          }}
          required
        />

        <p>{CITY_TEXT}</p>
        <select onChange={handleCitySelect}>
          <option>{CITY_PLACEHOLDER}</option>
          {City.sort((a: any, b: any) => (a.name > b.name ? 1 : -1)).map(
            (city: any, i: number) => (
              <option value={city.id}>{city.name}</option>
            )
          )}
        </select>

        <p>{PINCODE_TEXT}</p>
        <input
          type="text"
          className="input-box"
          placeholder={PINCODE_PLACEHOLDER}
          value={userPincode}
          onChange={(event) => {
            setuserPincode(event.target.value);                 
          }}
          maxLength={6}
          required
        />
      </div>
      <section>
        <input type="checkbox"  checked={userDefaultAddress}
          onChange={(event) => {
            setuserDefaultAddress(!userDefaultAddress);                 
          }} />
        <label>Set as default address</label>
        <br />
        <span>
          <input type="button" value="Save" className="input-button" onClick={onSaveClick} />
          <input
            type="button"
            value="Cancel"
            className="input-button"
            onClick={onCancelClick}
          />
        </span>
      </section>
    </div>
  );
}
