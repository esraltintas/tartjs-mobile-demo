/**
 * Created by esra on 29/01/15.
 */
// Copyright 2014 Startup Kitchen. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('app.models.FavouriteModel');
goog.require('goog.events.EventTarget');



/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
app.models.FavouriteModel = function() {
    this.favouriteShows = [];
    goog.base(this);
};
goog.inherits(app.models.FavouriteModel, goog.events.EventTarget);
goog.addSingletonGetter(app.models.FavouriteModel);


app.models.FavouriteModel.prototype.getfavouriteshowById = function(id) {
    return goog.array.find(this.favouriteShows, function(favouriteshow) {
        return favouriteshow['_id'] == id;

    });
};


app.models.FavouriteModel.prototype.getFavouriteShows = function() {
        return this.favouriteShows;
};

app.models.FavouriteModel.prototype.addShow = function(movie) {
    this.favouriteShows.push(movie);
}

app.models.FavouriteModel.prototype.remShow = function(id) {
    var j=this.favouriteShows.indexOf(id);
    this.favouriteShows.splice(j,1);
}
