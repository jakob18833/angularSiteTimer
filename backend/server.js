const express = require('express');
const fs = require('fs');
const cors = require('cors')
const path = require('path')
const app = express();

const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/file', (req, res) => {
    const filename = path.join(__dirname, 'data', req.query.username + '.json');
    //console.log('Reading file:', filename);

    const defaultValue = `{"home":0,"site1":0,"site2":0,"site3":0}`


    if (!fs.existsSync(filename)) {
        fs.writeFile(filename, defaultValue, (error) => {
        if (error) {
            console.error("Error creating a new file: ", error);
            return res.status(500).send(defaultValue);

        };
        console.warn("Created a new file.");
        return res.status(404).send(defaultValue);
    })
    }


    fs.readFile(filename, 'utf8', (error, data) => {
        if (error) {
            return res.status(500).send(defaultValue);
        } else {
            res.status(200).send(data);
        }
    })
})

app.post('/', (req, res) => {
    const body = req.body;

    const username = body.username;
    const data = body.data;

    if (!username || !data) {
        console.warn("Missing username or data.");
        return res.status(400).send("Missing info")
    }

    const filename = path.join(__dirname, "data", username + ".json");
    //console.log("Writing to file: " + filename);
    fs.writeFile(filename, JSON.stringify(data), (error) => {
        if (error) {
            return res.status(500).send("Failed to write");
        }
        return res.status(200).send("Saved!");
    })
});

app.listen(port, (error) => {
    if (error) {
        console.log("ERROR: " + error)
    } else {
        console.log("Listening on port " + port);
    }
})