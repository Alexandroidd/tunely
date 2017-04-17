var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Song = require('./song');



var AlbumSchema = new Schema ({
	artistName: String,
	name: String,
	releaseDate: String,
	genres: [String],
	songs: [{
		type: Schema.Types.ObjectId,
		ref: 'Song'
	}]


	// ingredients: [{
 //    type: Schema.Types.ObjectId,  // NOTE: Referencing
 //    ref: 'Ingredient'


});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;