import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import styles from "./usersFoms.module.css";

const LoginForm = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const [successful, setSuccessful] = useState(true);

  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
    userNameRef.current.value = "";
    passwordRef.current.value = "";
  };
  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <h3>Please enter your login information:</h3>
      <input
        type="text"
        id="username"
        name="username"
        required
        placeholder="Username"
        ref={userNameRef}
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        required
        ref={passwordRef}
      />
      <button type="submit">Sign in</button>
      {!successful && <p>Sorry! Please try again later</p>}
    </form>
  );
};
export default LoginForm;
