package com.quicknotes.dao;

import com.quicknotes.model.Note;

import java.util.List;

public interface NoteDao {
    List<Note> findAll();
    List<Note> findNotesByUserId(long userId);
    Integer createNoteForUser(long userId);
    Integer createNote();
    Note getNoteById(long id,long user_id);
    boolean removeNoteById(long noteId,long userId);
    boolean updateNoteById(long userId, Note note);
    boolean canAddNewOne(long userId);
}
