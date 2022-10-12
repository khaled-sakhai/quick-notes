import { useDispatch } from "react-redux";
import styles from "./noteEditor.module.css";
import { useRef } from "react";
import { saveNote } from "../../store/notesSlice";
const NoteEditor = (props) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    const updatedTitle = titleRef.current.textContent;
    const updatedContent = contentRef.current.textContent;
    const note = {
      id: props.note.id,
      title: updatedTitle,
      content: updatedContent,
    };
    dispatch(saveNote(note));
  };
  if (!props.note) {
    return <p>Please select or add a note</p>;
  }

  return (
    <section className={styles.noteEditor}>
      <div
        suppressContentEditableWarning={true}
        className={styles.noteTitle}
        contentEditable="true"
        role="textbox"
        onInput={handleChange}
        ref={titleRef}
      >
        {props.note.title}
      </div>
      <div
        suppressContentEditableWarning={true}
        className={styles.noteText}
        contentEditable="true"
        role="textbox"
        onInput={handleChange}
        ref={contentRef}
      >
        {props.note.content}
      </div>
    </section>
  );
};

export default NoteEditor;
