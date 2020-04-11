const handleGetFace = (face) => (req, res) => {
  const imageUrl = req.body.url;
  face.models.predict('a403429f2ddf4b49b307e318f00e528b', imageUrl)
  .then(response => {
    res.send(response.outputs[0].data.regions[0].region_info.bounding_box);
  })
  .catch(err => {
    res.status(400).json('unable to fetch face box data')
  })
}

module.exports = {
  handleGetFace:handleGetFace
}