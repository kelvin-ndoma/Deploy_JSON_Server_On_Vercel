// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Create a new subscriber
server.post('/subscribers', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: "Name and email are required." });
  } else {
    const newSubscriber = { name, email };
    const db = router.db;
    db.get("subscribers").push(newSubscriber).write();
    res.status(201).json(newSubscriber);
  }
});

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server

