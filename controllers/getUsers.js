const handleGetUsers = (req, res, db) => {
  db.select('*').from('users')
  .then(user => {
    res.send(user);
  })
}

module.exports = {
  handleGetUsers:handleGetUsers
}