import Header from "./Header";
import Rightbar from "./RightBare";
import Sidebar from "./Sidebar";
import styles from "./layout.module.css";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNotes } from "../store/notesSlice";

import NoteEditor from "./content/NoteEditor";

const Layout = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { listOfNotes, note, error, listIsLoading } = useSelector(
    (state) => state.notes
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotes());
  }, [isLoggedIn]);

  return (
    <section id={styles["layout"]}>
      <Header />
      <Sidebar
        data={listOfNotes}
        note={note}
        onError={error}
        onLoad={listIsLoading}
      />
      <main>
        <div className={styles.notesMargin}></div>
        <NoteEditor note={note} data={listOfNotes} />
      </main>
      <Rightbar />
      <Footer />
    </section>
  );
};
export default Layout;
