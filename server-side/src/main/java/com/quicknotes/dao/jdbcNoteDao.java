package com.quicknotes.dao;

import com.quicknotes.model.Note;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class jdbcNoteDao implements NoteDao{
    private JdbcTemplate jdbcTemplate;

    public jdbcNoteDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Note> findAll() {
        String sql = "SELECT * FROM NOTES;";
        List<Note> notesList = new ArrayList<>();
        SqlRowSet resultsOfNotes = jdbcTemplate.queryForRowSet(sql);

        while (resultsOfNotes.next()){
            Note note = mapRowToNote(resultsOfNotes);
            notesList.add(note);
        }

        return notesList;
    }

    @Override
    public List<Note> findNotesByUserId(long userId) {
        String sql = "SELECT * FROM notes Where user_id=?";
        List<Note> notesList = new ArrayList<>();
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,userId);
        while (results.next()){
            Note note = mapRowToNote(results);
            notesList.add(note);
        }
        return notesList;
    }

    @Override
    public Integer createNoteForUser(long userId) {
        Note note = new Note();
        note.setTitle("new note");
        note.setContent("please click to edit note");
        String sql = "INSERT INTO notes (note_title,note_content,user_id) values (?,?, ?) RETURNING note_id";
        return  jdbcTemplate.queryForObject(sql, Integer.class,note.getTitle(),note.getContent(),userId);
    }

    @Override
    public Integer createNote() {
        Note note = new Note();
        note.setTitle("new note");
        note.setContent("please click to edit note");
        String sql = "INSERT INTO notes (note_title,note_content) values (?,?) RETURNING note_id";
        return  jdbcTemplate.queryForObject(sql, Integer.class,note.getTitle(),note.getContent());
    }

    @Override
    public Note getNoteById(long id,long user_id) {
        Note note = new Note();
        String sql = "Select * from notes where note_id = ? and user_id = ?";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql,id,user_id);
        if (result.next()){
            note = mapRowToNote(result);
        }
        return note;
    }

    @Override
    public boolean removeNoteById(long noteId, long userId) {

        String sql = "DELETE FROM notes where note_id = ? AND user_id = ?" ;
        return jdbcTemplate.update(sql,noteId,userId)==1;
    }

    @Override
    public boolean updateNoteById(long user_id,Note note) {
        String sql = "UPDATE notes SET note_title =?, note_content=? WHERE note_id=? AND user_id = ?;";
        return jdbcTemplate.update(sql,note.getTitle(),note.getContent(),note.getId(),user_id) ==1;
    }

    @Override
    public boolean canAddNewOne(long user_id) {
        Note note = new Note();
        String sql = "select * from notes where user_id= ? order by note_id DESC limit 1;";

        SqlRowSet result = jdbcTemplate.queryForRowSet(sql,user_id);
        if (result.next()){
            note = mapRowToNote(result);
        }

        if (note!=null && note.getTitle()!=null && note.getContent()!=null){
            return !note.getContent().equalsIgnoreCase("please click to edit note") || !note.getTitle().equalsIgnoreCase("new note");
        }
        else {return true;}

    }

    public Note mapRowToNote(SqlRowSet rs){
        Note newNote = new Note();
        newNote.setId(rs.getLong("note_id"));
        newNote.setContent(rs.getString("note_content"));
        newNote.setTitle(rs.getString("note_title"));
        return newNote;
    }
}
