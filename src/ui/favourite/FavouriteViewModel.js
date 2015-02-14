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

goog.provide('app.ui.favourite.FavouriteViewModel');
goog.require('app.models.ShowsModel');
goog.require('tart.ui.ViewModel');



/**
 *
 * @constructor
 * @extends {tart.ui.ViewModel}
 */
app.ui.favourite.FavouriteViewModel = function() {
    goog.base(this);
    this.loadFavouriteShows();

};
goog.inherits(app.ui.favourite.FavouriteViewModel, tart.ui.ViewModel);


app.ui.favourite.FavouriteViewModel.prototype.getShowById = function(id) {
    return goog.array.find(this.shows, function(favouriteshows) {
        return favouriteshows['_id'] == id;

    });
};





/**
 *
 * @enum {string}
 */
app.ui.favourite.FavouriteViewModel.EventType = {
    LOADED: 'loaded',
    LOADED_MORE: 'loadedMore'
};