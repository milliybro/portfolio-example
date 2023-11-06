import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { request } from "../../../request";
import { userObj } from "../../../data/userData";
import { IMG_URL } from "../../../constants";

import avatar from "../../../assets/avatar-svgrepo-com.svg";
// import check from "../../../assets/check-removebg-preview.png";
// import ProgressIndicator from "../../../components/progres/ProgresIndicator";
import PasswordUpdate from "./PasswordUpdate";

import "./account.scss";
const Account = () => {
  // const [showConfirmation, setShowConfirmation] = useState(false);
  const [img, setImg] = useState("");
  const [userData, setuserData] = useState({ ...userObj, fields: "" });
  
  const getUserInfo = useCallback(async () => {
    try {
      const res = await request.get(`auth/me`);
      setuserData({
        ...res.data,
        fields: res.data.fields.join(),
        birthday: res.data.birthday.split("T")[0],
      });
      setImg(res.data.photo);
    } catch (err) {
      toast.error('Could not get user info!');
      
    }
  }, []);

  const {
    firstName,
    lastName,
    username,
    fields,
    // info,
    phoneNumber,
    birthday,
    address,
    email,
    // github,
    // linkedin,
    // telegram,
    // facebook,
    // instagram,
    // youtube,
  } = userData;
  

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);



  const changeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.files?.[0];
    const form = new FormData();
    result && form.append("file", result);
    try {
      const { data } = await request.post("auth/upload", form);
      setImg(data);
    } catch (err) {
      toast.error("Could not upload")
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await request.put("auth/updatedetails", { ...userData, photo: img });
      toast.success("Uploaded successfully!")
    } catch (err) {
      toast.error("Could not update")
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setuserData({
      ...userData,
      [name]: value,
    });
  };






  // const handleConfirmationToggle = () => {
  //   setShowConfirmation(!showConfirmation);
  // };
  // const totalFields = 16;
  
  // const calculatePercentageFilled = () => {
  //   const filledFieldCount = Object.values(userData).filter(value => value !== "").length;    
  //   return filledFieldCount
  // };
  // const filledPercentage = calculatePercentageFilled();
  
  return (
    <section id="account" className="account">
      <div className="account__wrapper">
        <div className="user_account_header">
          
          <div className="user_photo">
            <img src={img ? IMG_URL + img : avatar} alt="" />
          </div>
          <div className="user_info">
            <h1>{firstName}</h1>
            <h2>{lastName}</h2>
            <h4> {fields}</h4>

          </div>
        </div>
        <div style={{display: "flex", gap: "15px"}}>
        <div className="user_form_wrapper">
          <div className="form__container">
            <h1 className="edu_form_title">
              <img src={img ? IMG_URL + img : avatar} alt="" />
              Edit Information
            </h1>
            <form className="education__from" onSubmit={handleSubmit}>
              <div className="form__group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={onChange}
                  placeholder="First Name"
                />
              </div>
              <div className="form__group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={onChange}
                  placeholder="Last Name"
                />
              </div>
              <div className="form__group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={onChange}
                  placeholder="Username"
                />
              </div>
              <div className="form__group">
                <label htmlFor="fields0">Job</label>
                <input
                  type="text"
                  name="fields"
                  id="fields"
                  value={fields}
                  onChange={onChange}
                  placeholder="Fields! Enter with comma separated"
                />
              </div>
              <div className="form__group">
                <label htmlFor="photo">Photo</label>
                <input type="file" name="photo" onChange={changeImg} id="photo" accept="image/*" />
              </div>
              <div className="form__group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={onChange}
                  placeholder="Phone Number"
                />
              </div>
              <div className="form__group">
                <label htmlFor="birthday">Birthday</label>
                <input
                  type="date"
                  name="birthday"
                  onChange={onChange}
                  id="birthday"
                  value={birthday}
                />
              </div>
              <div className="form__group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={onChange}
                  placeholder="Address"
                  value={address}
                />
              </div>
              <div className="form__group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={onChange}
                  placeholder="Email"
                  value={email}
                />
              </div>
            
              <div className="form__group">
                <button className="submit_exp_btn add_edu" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <PasswordUpdate/>

        </div>
      </div>
      
    </section>
  );
};

export default Account;
