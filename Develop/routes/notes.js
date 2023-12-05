const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

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
        if (req.params.id) {
            
            console.info(`${req.method} request received to remove a note`);

            readFromFile('./db/db.json').then((data) => {
                var temp = JSON.parse(data)
               
                for (i = 0; i < temp.length; i++) {
                    if (temp[i].id === req.params.id) {
                        console.info("we found a match");
                        
                        // How do I actually delete it though?
                        
                        res.status(200).send("it's a match");
                        return;
                    }
                }
                res.status(404).send('Review not found');
            });
        }
        else {
            res.status(400).send('Review ID not provided');
        }
});
  
module.exports = notes;
  