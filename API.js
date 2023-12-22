const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000; // Or any port you prefer

const warnDataPath = path.join(__dirname, 'data', 'warnData.txt');
const urlsDataPath = path.join(__dirname, 'data', 'urlData.txt');
const heatDataPath = path.join(__dirname, 'data', 'heatData.txt');

app.get('/warn', (req, res) => {
  const user = req.query.user;
  if (!user) {
    res.status(400).json({ error: 'Missing user parameter' });
    return;
  }

  try {
    const warnData = fs.readFileSync(warnDataPath, 'utf8');
    const warns = warnData.split('\n').filter(line => line.trim());
    const existingWarns = warns.filter(line => line.startsWith(user));

    if (existingWarns.length >= 3) {
      res.status(400).json({ error: `User ${user} already has 3 or more warnings` });
      return;
    }

    fs.appendFileSync(warnDataPath, `${user}\n`);
    res.json({ warns: `User ${user} has been warned` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error handling warn request' });
  }
});

app.get('/post', (req, res) => {
  const url = req.query.url;
  if (!url) {
    res.status(400).json({ error: 'Missing url parameter' });
    return;
  }

  try {
    fs.appendFileSync(urlsDataPath, `${url}\n`);
    res.json({ post: 'URL added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving URL' });
  }
});

app.get('/start', (req, res) => {
  try {
    const urlsData = fs.readFileSync(urlsDataPath, 'utf8');
    const urls = urlsData.split('\n').filter(line => line.trim());

    if (urls.length === 0) {
      res.status(400).json({ error: 'No URLs found in the file' });
      return;
    }

    const randomIndex = Math.floor(Math.random() * urls.length);
    const randomUrl = urls[randomIndex];

    res.json({ url: randomUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving random URL' });
  }
});

app.get('/removeWarn', (req, res) => {
  const user = req.query.user;
  if (!user) {
    res.status(400).json({ error: 'Missing user parameter' });
    return;
  }

  try {
    const warnData = fs.readFileSync(warnDataPath, 'utf8');
    const warns = warnData.split('\n').filter(line => line.trim());
    const updatedWarns = warns.filter(line => !line.startsWith(user));

    fs.writeFileSync(warnDataPath, updatedWarns.join('\n'));
    res.json({ warns: `Warning for user ${user} has been removed` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error handling removeWarn request' });
  }
});

app.get('/checkWarns', (req, res) => {
  const user = req.query.user;
  if (!user) {
    res.status(400).json({ error: 'Missing user parameter' });
    return;
  }

  try {
    const warnData = fs.readFileSync(warnDataPath, 'utf8');
    const warns = warnData.split('\n').filter(line => line.trim());
    const userWarns = warns.filter(line => line.startsWith(user));

    res.json({ warns: `User ${user} has ${userWarns.length} warnings` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error handling checkWarns request' });
  }
});

app.get('/heatAdd', (req, res) => {
  const user = req.query.user;
  if (!user) {
    res.status(400).json({ error: 'Missing user parameter' });
    return;
  }

  try {
    const heatData = fs.readFileSync(warnDataPath, 'utf8');
    const heat = heatData.split('\n').filter(line => line.trim());
    const existingHeat = heat.filter(line => line.startsWith(user));

    if (existingHeat.length >= 5) {
      res.status(400).json({ error: `User ${user} already has 5 or more heat warnings. I can't store that data anymore.` });
      return;
    }

    fs.appendFileSync(heatDataPath, `${user}\n`);
    res.json({ heat: `User ${user} heat has been added` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error handling warn request' });
  }
});

app.get('/removeHeat', (req, res) => {
  const user = req.query.user;
  if (!user) {
    res.status(400).json({ error: 'Missing user parameter' });
    return;
  }

  try {
    const heatData = fs.readFileSync(heatDataPath, 'utf8');
    const heat = HeatData.split('\n').filter(line => line.trim());
    const updatedheat = warns.filter(line => !line.startsWith(user));

    fs.writeFileSync(heatDataPath, updatedheat.join('\n'));
    res.json({ heat: `Heat for user ${user} has been removed` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error handling removeWarn request' });
  }
});

app.get('/checkHeat', (req, res) => {
  const user = req.query.user;
  if (!user) {
    res.status(400).json({ error: 'Missing user parameter' });
    return;
  }

  try {
    const heatData = fs.readFileSync(heatDataPath, 'utf8');
    const heat = heatData.split('\n').filter(line => line.trim());
    const userHeat = heat.filter(line => line.startsWith(user));

    res.json({ heat: `User ${user} has ${userHeat.length} heat` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error handling checkWarns request' });
  }
});

app.listen(port, () => {
  console.log(`FLAP (Femboy Lounge API Panel) listening on port ${port}`);
});
