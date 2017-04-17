var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SongSchema = Schema ({
	name: String,
	trackNumber: Number,
});

var Song = mongoose.model('Song', SongSchema);

module.exports = Song;