#!/usr/bin/env node

'use strict';

module.exports = (app) => {

  const notes = require('../controllers/note.controller.js');

  // create a new note
  app.post('/notes', notes.create);

  // fetch all notes
  app.get('/notes', notes.findAll);

  // fetch a single note given noteId
  app.get('/notes/:noteId', notes.findOne);

  // update a single note given noteId
  app.put('/notes/:noteId', notes.update);

  // delete a single note given noteId
  app.delete('/notes/:noteId', notes.delete);

}
