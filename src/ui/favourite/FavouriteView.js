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

goog.provide('app.ui.favourite.FavouriteView');
goog.require('app.ui.favourite.FavouriteViewModel')
goog.require('app.ui.shows.DetailView');
goog.require('app.ui.shows.ListItem');
goog.require('app.models.FavouriteModel');
goog.require('tart.ui.NavBarComponent');
goog.require('tart.ui.View');



/**
 *
 * @constructor
 * @extends {tart.ui.View}
 */
app.ui.favourite.FavouriteView = function(movie) {
    this.model = new app.models.FavouriteModel();
    this.movie = movie;
    goog.base(this);
};
goog.inherits(app.ui.favourite.FavouriteView, tart.ui.View);




/**
 * @override
 */
app.ui.favourite.FavouriteView.prototype.templates_content = function() {
    return '<view class="list-view" id="' + this.id + '" style="-webkit-transform: translate3d(100%, 0, ' +
        this.index + 'px)">' +
        '<guncelle class = "guncelle" >Güncelle</guncelle>'+
        '<rem-fav class = "rem-fav">Çıkar</rem-fav>'
        '<fav-items></fav-items>' +
        '</view>' ;
};

app.ui.favourite.FavouriteView.prototype.bindModelEvents = function() {
    this.model.addEventListener(app.ui.favourite.FavouriteViewModel.EventType.LOADED, this.onLoaded, false, this);
    this.model.addEventListener(app.ui.favourite.FavouriteViewModel.EventType.LOADED_MORE, this.onLoadedMore, false, this);

    /*this.refreshListener = goog.events.listen(this.p2rComponent, this.p2rComponent.EventType.SHOULD_REFRESH,
        this.onShouldRefresh, false, this);

    this.infiniteScrollListener = goog.events.listen(this.infiniteScrollComponent, this.infiniteScrollComponent.EventType.SHOULD_LOAD,
        this.onInfiniteScroll, false, this);*/
};


/**
 * @override
 */
app.ui.favourite.FavouriteView.prototype.onAfterRender = function() {
    this.onLoaded();

   /* this.p2rComponent.render(this.getElement());
    this.infiniteScrollComponent.render(this.getElement());*/
};


/*app.ui.shows.ListView.prototype.onInfiniteScroll = function() {
    setTimeout(function() {
        this.model.loadMore();
    }.bind(this), 2000);
};
*/
app.ui.favourite.FavouriteView.prototype.onLoaded = function() {
    if (!this.rendered || !this.model.FavouriteModel) return;

    //this.p2rComponent.reset();

    this.movieComponents = this.model.FavouriteModel.map(function(movie) {
        return new app.ui.shows.ListItem(movie);
    }, this);

    var markup = this.movieComponents.map(function(cmp) {
        return cmp.templates_base();
    }).join('');

    this.getChild('fav-items')[0].innerHTML = markup;
    //this.infiniteScrollComponent.showSpinner();
};


app.ui.favourite.FavouriteView.prototype.onLoadedMore = function(e) {
    var listEl_ = this.getChild('fav-items')[0];

    if (e.diff) {
        var movieComponents = e.diff.map(function(movie) {
            return new app.ui.shows.ListItem(movie);
        }, this);

        var markup = movieComponents.map(function(cmp) {
            return cmp.templates_base();
        }).join('');

        listEl_.appendChild(goog.dom.htmlToDocumentFragment(markup));

      /*  if (e.endOfFeed)
            this.infiniteScrollComponent.showEndOfList();
        else
            this.infiniteScrollComponent.showSpinner();*/
    }
};


app.ui.favourite.FavouriteView.prototype.updateFavTap = function(e) {
    app.models.FavouriteModel.getInstance().getFavouriteShows();
    console.log(app.models.FavouriteModel.getInstance().getFavouriteShows());
};




app.ui.favourite.FavouriteView.prototype.removeFavTap = function(e) {
    app.models.FavouriteModel.getInstance().remShow(this.id);
};


app.ui.favourite.FavouriteView.prototype.events = {
    'tap': {
        'rem-fav': app.ui.favourite.FavouriteView.prototype.removeFavTap,
        'guncelle': app.ui.favourite.FavouriteView.prototype.updateFavTap
    }
};
