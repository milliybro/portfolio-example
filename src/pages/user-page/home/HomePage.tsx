import { Fragment, useEffect, useState } from "react";
import { request } from "../../../request";
import { Link, NavLink } from "react-router-dom";
import close_icon from "../../../assets/default-page-icons/close.png";
import tg from "../../../assets/default-page-icons/icons8-telegram-48.png";
import insta from "../../../assets/default-page-icons/icons8-instagram-24.png";
import github from "../../../assets/default-page-icons/icons8-github-30.png";
import youtube from "../../../assets/default-page-icons/icons8-youtube-30.png";
import "./style.scss";
import { IMG_URL } from "../../../constants";
import avatar from "../../../assets/avatar-svgrepo-com.svg";
// import useSkillsStore from "../../../states/skillData";
import useExperiencesStore from "../../../states/experience";
import useEducationStore from "../../../states/education";
const HomePage = () => {
  const [top, setTop] = useState(false);
  const [menuControl, setMenuControl] = useState(false);
  const [img, setImg] = useState("");
//   const { skills, fetchSkills } = useSkillsStore();
//   const [loading, setLoading] = useState(false);
//   const experiences = useExperiencesStore((state) => state.experiences);
//   const education = useEducationStore((state) => state.education);
  const fetchEducation = useEducationStore((state) => state.fetchEducation);
  const fetchExperiences = useExperiencesStore(
    (state) => state.fetchExperiences
  );
//   console.log(fetchSkills);

  const toggleNavbar = () => setTop(!top);

  const [userData, setUserData] = useState({
    birthday: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
    info: "",
    telegram: "",
    instagram: "",
    github: "",
    youtube: "",
    photo: "",
    fields: [],
  });

  const getData = async () => {
    try {
      // setLoading(true);
      const res = await request.get(`auth/me`);
      setUserData(res.data);
      setImg(res.data.photo);
      // setAllMessages(res.data.data);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const toggleMenu = () => setMenuControl(!menuControl);

  //   About
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const dob = new Date(birthDate);

    const yearsDiff = today.getFullYear() - dob.getFullYear();

    let age = "";

    if (yearsDiff > 0) {
      age += `${yearsDiff} y.o.`;
    }

    return age.trim();
  };

  useEffect(() => {
    getData();
    fetchEducation();
    fetchExperiences();
  }, [fetchExperiences, fetchEducation]);

  return (
    <Fragment>
      <header id="header" className={`${top ? "header-top" : null}`}>
        <div className="container">
          <div className="nav__wrapper">
            <div className="first__nav">
              <h2 className="hi">Hi!</h2>
              <h1 className="hero_name" onClick={toggleNavbar}>
                <Link to={"#"}>
                  I'm {userData?.firstName} {userData?.lastName}
                </Link>
              </h1>
              <h2>
                I'm a <span className="fields">{userData.fields[0]}</span>
              </h2>
              <nav id="navbar" className="navbar">
                {top ? (
                  <>
                    <ul>
                      <li onClick={toggleNavbar}>
                        <a href="#">Home</a>
                      </li>
                      <li>
                        <a href="#about">About</a>
                      </li>
                      <del>
                      <li>
                        <a href="#resume"> Resume</a>
                      </li>
                    </del>
                      <li>
                        <a href="#portfolio">Portfolio</a>
                      </li>
                      <li>
                        <a href="#contact">Contact</a>
                      </li>
                    </ul>
                  </>
                ) : (
                  <ul>
                    <li onClick={toggleNavbar}>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#about">About</a>
                    </li>
                    <del>
                      <li>
                        <a href="#resume"> Resume</a>
                      </li>
                    </del>
                    <li>
                      <a href="#portfolio">Portfolio</a>
                    </li>
                    <li>
                      <a href="#contact">Contact</a>
                    </li>
                  </ul>
                )}
              </nav>
              {/* <button onClick={toggleMenu} className="mobile_menu">
              <img src={mobile_menu} alt="" />
            </button> */}

              <div className="social_links">
                <Link to={userData.telegram}>
                  {" "}
                  <img src={tg} alt="" />{" "}
                </Link>
                <Link to={userData.instagram}>
                  {" "}
                  <img src={insta} alt="" />{" "}
                </Link>
                <Link to={userData.github}>
                  {" "}
                  <img src={github} alt="" />{" "}
                </Link>
                <Link to={userData.youtube}>
                  {" "}
                  <img src={youtube} alt="" />{" "}
                </Link>
              </div>
            </div>
            <div className="second__nav">
              <img src={img ? IMG_URL + img : avatar} alt="" />
            </div>
          </div>
        </div>
      </header>
      <div
        className="mobile_menue_modal"
        style={{ display: `${menuControl ? "" : "none"}` }}
      >
        <button onClick={toggleMenu} className="close_btn">
          <img src={close_icon} alt="" />
        </button>
        <ul>
          <li onClick={toggleNavbar}>
            <NavLink onClick={toggleMenu} to={"/"}>
              Home
            </NavLink>
          </li>
          <li onClick={toggleMenu}>
            <NavLink to={"/about"}>About</NavLink>
          </li>
          <li onClick={toggleMenu}>
            <NavLink to={"/resume"}>Resume</NavLink>
          </li>
          <li onClick={toggleMenu}>
            <NavLink to={"/portfolio"}>Portfolio</NavLink>
          </li>
          <li onClick={toggleMenu}>
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
        </ul>
      </div>
      <section id="about" className="about">
        <div className="about">
          <div className="container">
            <div className="about__wrapper">
              <div className="top_heading">
                <span>About me</span>
                <div className="line"></div>
              </div>
              <div className="about__me">
                <div className="about__personal__data">
                  <h2>My information</h2>
                  <div className="data_list">
                    <ul>
                      <li>
                        <span>Birthday:</span>
                        {userData?.birthday?.split("T")[0]}
                      </li>
                      <li>
                        <span>Phone:</span>
                        {userData?.phoneNumber}
                      </li>
                      <li>
                        <span>Address:</span>
                        {userData?.address}
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <span>Age:</span>
                        {userData?.birthday && calculateAge(userData?.birthday)}
                      </li>
                      <li>
                        <span>Email:</span>
                        {userData?.email}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section id="resume" className="resume">
      <div className="container">
        <div className="resume__wrapper">
          <div className="top_heading">
            <span>Resume</span>
            <div className="line"></div>
          </div>
          <div className="main_heading">
            <h1>Check My Resume</h1>
          </div>
          <div className="resume__education">
            <div className="rsume_list">
              <h1 className="heading">Experience</h1>
              {experiences.map((res) => (
                <div className="rsume_list_item" key={res._id}>
                  <h1>Sumary</h1>
                  <div className="resume_item">
                    <h2>{res?.companyName}</h2>
                    <p id="period">
                      <span className="start">
                        {res?.startDate.split("-")[0]}{" "}
                      </span>
                      -<span className="end">{res?.endDate.split("-")[0]}</span>
                    </p>
                    <p>
                      <em>{res?.description}</em>
                    </p>
                    <ul>
                      <li>{userData?.phoneNumber}</li>
                      <li>{userData?.email}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="rsume_list">
              <h1 className="heading">Education</h1>
              <div className="rsume_list_item">
                <h1>Sumary</h1>
                {education.map((res) => (
                  <div className="resume_item" key={res._id}>
                    <h2>{res?.name}</h2>
                    <p id="period">
                      <span className="start">
                        {res?.startDate.split("-")[0]}
                      </span>
                      -<span className="end">{res?.endDate.split("-")[0]}</span>
                    </p>
                    <p>
                      <em>{res?.description}</em>
                    </p>
                    <ul>
                      <li>{res?.level}</li>
                      <li>{userData?.phoneNumber}</li>
                      <li>{userData?.email}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> */}
    </Fragment>
  );
};

export default HomePage;
