// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var db = require('./models');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

var albumGenres = [];


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/albums', function album_index(req, res){
  db.Album.find({}, function(err, albums){
    if(err) console.log(err);
    res.json(albums);
  });
});

app.post('/api/albums', function createAlbum(req, res){
 var newAlbum = new db.Album({
  
  artistName: req.body.artistName,
  name: req.body.name,
  releaseDate: req.body.releaseDate,
  genres: req.body.genres

 });

   newAlbum.save(function(err, album) {
    if(err) {return console.log('save error', err);}
    res.json(album);
   }); 
});

app.post('/api/albums/:id/songs', function createSongs(req, res){
  var newSong = req.body;
  console.log(req.params.id);
  
  db.Album.findById(req.params.id, function(err, album) {
       db.Album.findById(req.params.id)
         .exec(function(err,goodAlbum) {
          if (err) {
            console.log(err);
          } else {
            goodAlbum.songs.push(newSong);
            goodAlbum.save();

        
        }
        res.json(goodAlbum);
        
    });

  });  
    
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
