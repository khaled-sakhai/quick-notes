package com.quicknotes.controller;

import com.quicknotes.dao.NoteDao;
import com.quicknotes.dao.UserDao;
import com.quicknotes.model.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@PreAuthorize("isAuthenticated()")
@RestController
@CrossOrigin
public class NoteController {
private final NoteDao noteDao;
    private final UserDao userDao;


    @Autowired
    public NoteController(NoteDao noteDao, UserDao userDao) {
        this.noteDao = noteDao;
        this.userDao = userDao;
    }

    @RequestMapping(path = "all-notes", method = RequestMethod.GET)
    public List<Note> getAllNotes(){
        return noteDao.findAll();
    }

    @RequestMapping( path =  "add",method = RequestMethod.POST)
    public Integer createNewForUser( Principal principal) throws Exception {

         if (noteDao.canAddNewOne(userDao.findIdByUsername(principal.getName()))){
            return noteDao.createNoteForUser(userDao.findIdByUsername(principal.getName()));
        }
       else throw new Exception("you cant");
    }


    @RequestMapping(path = "all",method = RequestMethod.GET)
    public List<Note> getNotesForUser(Principal principal){
    return noteDao.findNotesByUserId(userDao.findIdByUsername(principal.getName()));
    }

    @RequestMapping(path = "remove/{note_id}",method = RequestMethod.DELETE)
    public boolean removeNote(@PathVariable long note_id,Principal principal){
        return noteDao.removeNoteById(note_id,userDao.findIdByUsername(principal.getName()));
    }

   //@RequestMapping(path = "get/{note_id}",method = RequestMethod.GET)

    @RequestMapping(path = "get/{note_id}",method = RequestMethod.GET)
    public Note getNoteByID(@PathVariable long note_id  ,Principal principal){
        return noteDao.getNoteById(note_id,userDao.findIdByUsername(principal.getName()));
    }


    @RequestMapping(path = "update",method = RequestMethod.PUT)
    public  boolean updateNoteById(Principal principal,@RequestBody Note note){
        return noteDao.updateNoteById(userDao.findIdByUsername(principal.getName()),note);
    }


}
