import * as express from 'express';
const bodyParser = require('body-parser');
const app = express()

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '172.18.0.2',
    user : 'melo',
    password : 'melo',
    database : 'test'
  }
});

app.use(bodyParser.json());


app.get("/", (req, res) => {
  console.log("'Responding to root route")
  res.send("'Hello from ROOOOOT")

})

app.get("/users", (req, res) => {
  const user1 = { firstName: "Stephen", LastName: "Curry" }
  const user2 = { firstName: "Kevin", lastName: "Durant" }
  res.json([user1, user2])
})

app.get("/new_users", (req, res) => {

let t = new Array;
  knex.from('User').select("*")
      .then((rows: any) => {
          for (let row of rows) {
              console.log(`${row['id']} ${row['nome']}`);
              t.push(`${row['id']}`, `${row['nome']}`)
          }
      }).catch((err) => { console.log( err); throw err })
      .finally(() => {
          knex.destroy();
      });


  res.json(t)
  console.log( t )

})


app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")

}









// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());
// // Avvia il job che sta in ascolto in modo da intercettare i cambiamenti sul file dnsmasq.leases 
// // ad ogni modifica verrà richiamato il metodo per scansionare l'arp table e contattare i GW


// const pubApiDnsRoute = require('./routes/dnsRoutes');
// app.use('/dns_request', pubApiDnsRoute);

// require('./shared/watcher');

// app.listen(3880, () => {
//   console.log('Application listening on port 3880!');
// });

// // import test from './services/watcherService';
// // const t = new test();
// // t.test();
// module.exports = app;
