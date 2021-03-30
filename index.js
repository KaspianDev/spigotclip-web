const express = require('express');
const fs = require('fs/promises');
const config = require('./config.json');
const app = express();
const port = 3000;

const fileRegex = /spigotclip-([0-9*.]+[0-9]+)-([A-Fa-f0-9]{8})\.jar/;

app.use('/', express.static('static'));
app.use('/downloads/', express.static(config["jar-path"]));

app.get('/api', async (req, res) => {
    let out = [];
    let files = await fs.readdir(config["jar-path"])
    for (let file of files.filter(x => x.endsWith(".jar"))) {
        let stat = await fs.stat(`${config["jar-path"]}/${file}`);
        let nameMatch = fileRegex.exec(file);
        let md5 = await fs.readFile(`${config["jar-path"]}/${file}.md5`);
        out.push({
            "version": nameMatch[1],
            "commit": nameMatch[2],
            "md5": md5.toString().replace('\n', ''),
            "buildDate": stat.ctimeMs
        });
    }
    res.json(out);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});