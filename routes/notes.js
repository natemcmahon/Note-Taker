const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a notes`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
        title,
        text,
        id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');
    }
});

notes.delete('/:id', (req, res) => {
        const tempId = req.params.id;
        console.info(`${req.method} request received to remove a note`);

        const temp = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        for (i = 0; i < temp.length; i++) {
                    if (temp[i].id === tempId) {
                        console.info("we found a match");
                        temp.splice(i,1);
                    }
        }
        fs.writeFileSync('./db/db.json', JSON.stringify(temp));
        res.json(temp);        
});
  
module.exports = notes;
  