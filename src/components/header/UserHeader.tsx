import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../states/auth";
import { useCallback, useEffect, useState } from "react";
import { request } from "../../request";
import { IMG_URL } from "../../constants";


import bell from "../../assets/bell.png";
import avatar from "../../assets/avatar-svgrepo-com.svg";
import search from "../../assets/search-icon.png";

import "./Header.scss";

const UserHeader = () => {
  const navigate = useNavigate()
  const [openDropdown, setOpenDropdown] = useState(false);
  const [unansweredMessages, setUnansweredMessages] = useState(0);
  const { userId } = useAuth();
  const [userData, setUserData] = useState({
    birthday: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
    info: "",
    photo: "",
  });


  const unresponseMessages = useCallback(async () => {
    try {
      const res = await request(
        `messages?answer&whom=${userId}`
      );
      const { pagination } = res.data;
      setUnansweredMessages(pagination.total)      
    } catch (err) {
      toast.error("Failed to get unanswered messages");
    } 
  }, [userId]);


  const controlDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const { logout } = useAuth();
  const handleLogout = () => {
    if (confirm("Are you sure you want to log")) {
      logout();
      navigate('/login')
    }
  };

  const getData = async () => {
    try {
      const res = await request.get(`auth/me`);
      setUserData(res.data);
    } catch (err) {
      toast.error("Failed to get user data");
    }
  };
  
  useEffect(() => {
    getData();
    unresponseMessages()
  }, [unresponseMessages, unansweredMessages]);
  return (
    <header className="header">
      <span className="piece-of"></span>
      <div className="admin__container">
        <div className="main__search">
          <input type="text" placeholder="Searching ...." />
          <img className="search_icon" src={search} alt="icon" />
        </div>
        <div className="message_notify">
          <Link to={"/messages"}>
            <img className="m-notify" src={bell} alt="icon" />
          </Link>
          <span className="bell">{unansweredMessages}</span>
        </div>
        <div className="account">
          <div className="accountim" onClick={controlDropdown}>
            <img className="account__img" src={userData.photo ? IMG_URL + userData.photo : avatar} alt="icon" />
            <h4>{userData.firstName}</h4>
          </div>
          <div
            className={openDropdown ? "user_dropdown open" : "user_dropdown"}
          >
            <ul>
              {/* kerakli */}
              {/* <li>
                <Link to={"/about"}>
                    View Profile
                </Link>
              </li> */}
              <li>
                <Link to={"/account"}>
                  Account
                </Link>
              </li>
              <li>
                <Link to={"/settings"}>
                  Settings
                </Link>
              </li>

            </ul>
            <div className="line"></div>
            <div className="logout">
              <button onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
