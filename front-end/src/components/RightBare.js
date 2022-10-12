import styles from "./rightBare.module.css";
import * as FaIcons from "react-icons/fa";
import { useState } from "react";
import LoginForm from "./users/LoginFrom";
import SignUpForm from "./users/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
const USER_NAVIGATION_OPTIONS = [
  { id: 1, option: "login", component: <LoginForm /> },
  { id: 2, option: "signUp", component: <SignUpForm /> },
];
const Rightbar = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loginToggle, setLoginToggle] = useState(USER_NAVIGATION_OPTIONS[0]);
  const handleLoginToggle = () => {
    setLoginToggle(USER_NAVIGATION_OPTIONS[0]);
  };
  const handleSignUpToggle = () => {
    setLoginToggle(USER_NAVIGATION_OPTIONS[1]);
  };
  if (isLoggedIn) {
    return (
      <section className={styles.rightBar}>
        <div className={styles.buttons}>
          <p onClick={handleLoginToggle}>
            <FaIcons.FaHouseUser />
            Profile
          </p>
          <p
            onClick={() => {
              dispatch(logout());
            }}
          >
            <FaIcons.FaUserAltSlash />
            Logout
          </p>
        </div>

        <h3>Welcome {currentUser.user.username}</h3>
        <p>Happy journaling</p>
      </section>
    );
  }
  return (
    <section className={styles.rightBar}>
      <div className={styles.buttons}>
        <p onClick={handleLoginToggle}>
          <FaIcons.FaUserCircle />
          Login
        </p>
        <p onClick={handleSignUpToggle}>
          <FaIcons.FaUserPlus />
          Sign Up
        </p>
      </div>

      {loginToggle.component}
    </section>
  );
};
export default Rightbar;
