import styles from "./sidebar.module.css";
import * as FaIcons from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewNote, deleteNote, notesActions } from "../store/notesSlice";

const Sidebar = (props) => {
  const [deletMode, setDeletMode] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const dispatch = useDispatch();
  const handleSelectToShowNote = (e) => {
    const id = e.target.id;
    dispatch(notesActions.showNote(id));
  };

  const addNew = () => {
    setDeletMode(false);
    setSelectMode(false);
    dispatch(addNewNote());
    dispatch(notesActions.getLastNote());
  };

  const selectModeToggle = () => {
    setSelectMode((prev) => !prev);
    if (deletMode) {
      setDeletMode(false);
    }
  };
  const removeNote = () => {
    const id = props.note.id;
    if (window.confirm("Are you sure you want to remove this note ?")) {
      selectModeToggle();
      dispatch(deleteNote(id));
    } else return;
  };

  const handleSelectToDelete = (e) => {
    const idSelected = e.target;
    if (idSelected.type === "radio") {
      dispatch(notesActions.showNote(idSelected.value));
      setDeletMode(true);
    }
  };
  return (
    <section className={styles.sideBar}>
      {props.onError && <p className={styles.error}>{props.onError}</p>}
      <div className={styles.buttons}>
        <p onClick={addNew}>
          <FaIcons.FaPlus />
        </p>
        {props.data.length > 0 && (
          <p>
            <FaIcons.FaCheck onClick={selectModeToggle} />
          </p>
        )}
        {deletMode && (
          <p onClick={removeNote}>
            <FaIcons.FaTimes />
          </p>
        )}
      </div>
      <ul className={styles.list}>
        {selectMode &&
          props.data.map((e, i) => {
            return (
              <label key={e.id} id={e.id} onClick={handleSelectToDelete}>
                <input type="radio" name="notes" value={e.id} />
                <li id={e.id}>
                  {e.title.length > 22
                    ? `${e.title.substring(0, 22)}... `
                    : e.title}
                </li>
              </label>
            );
          })}

        {!selectMode &&
          (props.onLoad ? (
            <p>Loading...</p>
          ) : (
            props.data.map((e, i) => {
              return (
                <li key={e.id} id={e.id} onClick={handleSelectToShowNote}>
                  {e.title.length > 28
                    ? `${e.title.substring(0, 28)}... `
                    : e.title}
                </li>
              );
            })
          ))}
      </ul>
    </section>
  );
};
export default Sidebar;
