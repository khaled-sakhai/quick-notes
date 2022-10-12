import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/authSlice";
import styles from "./usersFoms.module.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [successful, setSuccessful] = useState(false);

  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();
  const handleSignUp = (e) => {
    e.preventDefault();
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = passwordConfRef.current.value;
    const role = "USER";

    dispatch(register({ username, password, confirmPassword, role }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });

    userNameRef.current.value = "";
    passwordRef.current.value = "";
    passwordConfRef.current.value = "";
  };
  return (
    <form className={styles.form} onSubmit={handleSignUp}>
      <h3>Please enter your user information:</h3>
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
      <input
        type="password"
        id="confpassword"
        name="confpassword"
        placeholder="Confirm Password"
        required
        ref={passwordConfRef}
      />
      <button type="submit">Register new user</button>
      {successful && <p>Congratulations! you can login now</p>}
    </form>
  );
};
export default SignUpForm;
