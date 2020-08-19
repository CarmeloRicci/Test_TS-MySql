// import * as express from 'express';
// const bodyParser = require('body-parser');
// const app = express()

// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host : '172.18.0.2',
//     user : 'melo',
//     password : 'melo',
//     database : 'test'
//   }
// });

// app.use(bodyParser.json());


// app.get("/", (req, res) => {
//   console.log("'Responding to root route")
//   res.send("'Hello from ROOOOOT")

// })

// app.get("/users", (req, res) => {
//   const user1 = { firstName: "Stephen", LastName: "Curry" }
//   const user2 = { firstName: "Kevin", lastName: "Durant" }
//   res.json([user1, user2])
// })

// app.get("/new_users", (req, res) => {

// let t = new Array;
//   knex.from('User').select("*")
//       .then((rows: any) => {
//           for (let row of rows) {
//               console.log(`${row['id']} ${row['nome']}`);
//               t.push(`${row['id']}`, `${row['nome']}`)
//           }
//       }).catch((err) => { console.log( err); throw err })
//       .finally(() => {
//           knex.destroy();
//       });


//   res.json(t)
//   console.log( t )

// })


// app.listen(3003, () => {
//   console.log("Server is up and listening on 3003...")

// }



import * as express from 'express';
const bodyParser = require('body-parser');

const cfg = require('config');
const path = require('path');
const dotenv = require('dotenv');
// const expressJwt = require('express-jwt');
// const authenticate = expressJwt({ secret: cfg.jwt.jwtSecret });
const envFilename = path.join(
  __dirname,
  '../',
  'env/',
  cfg.env.envFilename
);
console.log(`loading env file '${envFilename}'...`);
dotenv.config({ path: envFilename });
const app = express();
app.use(bodyParser.json());

const passport = require('passport');

// require('passport').setupStrategies(passport);

// const pubApiDNSRoute = require('./routes/public/dnsRoutes');
// const pubApiUserRoutes = require('./routes/public/userRoutes')(passport);

// const prvApiTenantRoute = require('./routes/private/tenantRoutes');
// const prtApiUserRoutes = require('./routes/private/userRoutes');
// const prtApiDeviceRoutes = require('./routes/private/deviceRoutes');

// app.use('/dns', pubApiDNSRoute);
// app.use('/user', pubApiUserRoutes);

// app.use('/api/private/device', authenticate, prtApiDeviceRoutes);
// app.use('/api/private/tenant', authenticate, prvApiTenantRoute);
// app.use('/api/private/user', authenticate, prtApiUserRoutes);



// const frontendPublic = path.join(__dirname, '../../frontend/public');
// const frontendDist = path.join(__dirname, '../../frontend/dist');
// app.use('/public', express.static(frontendPublic));
// app.use('/dist', express.static(frontendDist));
// app.get('*', (req, res, next) => {
//   res.sendFile(path.join(frontendPublic, '/index.html'));
// });

// Avvia il job che sta in ascolto in modo da intercettare i cambiamenti sul file dnsmasq.leases 
// ad ogni modifica verrà richiamato il metodo per scansionare l'arp table e contattare i GW
// require('./shared/watcher');


app.listen(3003, () => {
  console.log('Application listening on port 3880!');
});

// import test from './services/watcherService';
// const t = new test();
// t.test();
module.exports = app;
