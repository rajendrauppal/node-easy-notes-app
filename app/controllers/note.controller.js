#!/usr/bin/env node

'use strict';

const Note = require('../models/note.model');

// create and save a new note
exports.create = (req, res) => {

  // validate the request
  if (!req.body.content) {
    res.status(400).json({
      message: "Note content cannot be empty"
    });
  }

  // create the note
  const note = new Note({
    title: req.body.content || 'Untitled Note',
    content: req.body.content
  });

  // save the note in mongodb
  note.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while saving the note in the database"
      });
    });

};

// fetch all notes from the database
exports.findAll = (req, res) => {
  Note.find()
    .then(notes => {
      res.send(notes);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while fetching all notes"
      });
    });
}

// find a single note given noteId
exports.findOne = (req, res) => {
  let noteId = req.params.noteId;
  Note.findById(noteId)
    .then(note => {
      if (!note) {
        res.status(404).send({
          message: "Note not found with id " + noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind == 'ObjectId') {
        res.status(404).send({
          message: "Note not found with id " + noteId
        });
      }
      res.status(500).send({
        message: "Could not fetch note with id " + noteId
      });
    });
}

// update a single note given its noteId
exports.update = (req, res) => {

  // validate the request
  if (!req.body.content) {
    res.status(400).send({
      message: "Note content cannot be empty"
    });
  }

  // update the note
  let noteId = req.params.noteId;
  let newNote = {
    title: req.body.title || 'Untitled Note',
    content: req.body.content
  };
  Note.findByIdAndUpdate(noteId, newNote, { new: true })
    .then(note => {
      if (!note) {
        res.status(404).send({
          message: "Note not found with id " + noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        res.status(404).send({
          message: "Note not found with id " + noteId
        });
      }
      res.status(500).send({
        message: "Could not update note with id " + noteId
      });
    });

}

// delete a single note given its noteId
exports.delete = (req, res) => {

  let noteId = req.params.noteId;
  Note.findByIdAndRemove(noteId)
    .then(note => {
      if (!note) {
        res.status(404).send({
          message: "Note not found with given id " + noteId
        });
      }
      res.send({
        message: "Note " + noteId + " deleted successfully"
      });
    })
    .catch(err => {
      if (err.kind === 'ObjecId' || err.name == 'NotFound') {
        res.status(404).send({
          message: "Note not found with given id " + noteId
        });        
      }
      res.status(500).send({
        message: "Could not delete note with id " + noteId
      });
    });

}

