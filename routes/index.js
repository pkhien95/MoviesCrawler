var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var phantom = require('phantom');

/* GET home page. */
router.get('/', function (req, res, next) {
    var options = {
        method: 'GET',
        url: 'https://123movies.is/ajax/movie_load_info/19637',
        headers: {
            'cache-control': 'no-cache',
            'User-Agent': 'Macbook Pro'
        }
    };
    getMovieList(options, function (html) {
        res.send(html).end()
    })
});

router.get("/phantom", function (req, res) {
    testPhantom();
});

router.get("/crawl", function (req, res) {

    var options = {
        method: 'GET',
        url: 'https://123movies.is/movie/filter/all',
        headers: {
            'cache-control': 'no-cache'
        }
    };

    getMovieList(options, function (html) {
        var $ = cheerio.load(html);
        $('.movies-list').each(function (i, element) {
            var movieList = $(this).children().find("a");
            movieList.each(function (i, element) {
                var movie = {
                    title: "",
                    watchLink: "",
                    infoLink: "",
                    thumb: "",
                    movieInfo: ""
                };
                movie.title = $(this).attr('title');
                movie.watchLink = $(this).attr('href');
                movie.infoLink = $(this).attr("data-url");
                movie.thumb = $(this).children("img").attr("data-original");

                getMovieInfo(urlToOptions(movie.infoLink), function (movieInfo) {
                    movie.movieInfo = movieInfo;

                    getVideoLink(movie.watchLink, function (videoURL) {
                        movie.watchLink = videoURL;
                        console.log(movie);
                        console.log("\n")
                    });

                });
            });
        })
    });
});

function getMovieList(options, callback) {
    request(options, function (error, response, html) {
        callback(html)
    });
}

function getMovieInfo(options, callback) {
    request(options, function (err, response, html) {
        var $ = cheerio.load(html);
        var data = $(this);
        var movieInfo = {
            quality: "",
            idmb: "",
            year: "",
            length: "",
            description: "",
            country: [],
            genre: []
        };
        movieInfo.quality = $(".jtip-quality").first().text();
        movieInfo.idmb = $(".jtip-top").children().eq(0).text();
        movieInfo.year = $(".jtip-top").children().eq(1).text();
        movieInfo.length = $(".jtip-top").children().eq(2).text();
        movieInfo.description = $(".f-desc").first().text();
        var countries = $(".block").first().children("a");
        countries.each(function (i, arr) {
            movieInfo.country.push($(this).text())
        });
        var genre = $(".block").first().next().children("a");
        genre.each(function (i, arr) {
            movieInfo.genre.push($(this).text())
        });
        callback(movieInfo);
    })
}

function getVideoLink(watchUrl, callback) {
    var requestUrl = watchUrl + "/watching.html";
    request(urlToOptions(requestUrl), function (error, response, html) {
        var $ = cheerio.load(html);
        var videoURL = jwplayer("media-player").getPlaylist();
        callback(videoURL);
    })
}

function testPhantom() {
    

    phantom.create().then(function (ph) {
        ph.createPage().then(function (page) {
            // page.set('settings', {
            //     userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11",
            //     javascriptEnabled: true,
            //     loadImages: true
            // });



            page.open('https://123movies.is/film/chicago-justice-season-1-19661/watching.html').then(function (status) {
                console.log(status);



                page.property('resourceReceived', function(rs, networkRequest) {
                    console.log('resourceReceived');

                    page.evaluate(function () {
                        console.log("getElementsByClassName");
                        return document.getElementsByClassName("jw-media");
                    }).then(function (jsondata) {
                        console.log("media-loaded");
                        console.log(jsondata);
                    });
                });

                // page.property('content').then(function(content) {
                //     // var $ = cheerio.load(content);
                //     console.log(content);
                //     page.close();
                //     ph.exit();
                // });
                // page.evaluate(function() {
                //     console.log(jwplayer("media-player").getPlaylist());
                // });
                // page.property('resourceReceived', function(status) {
                //     console.log(status);
                //     page.evaluate(function () {
                //         return jwplayer('media-player').getPlaylist();
                //     }).then(function (jsondata) {
                //         console.log("media-loaded");
                //         console.log(jsondata);
                //     });
                // });
                // if (status === "success") {
                //     page.evaluate(function () {
                //         // lastest version on the web
                //         console.log("media-player-data:", jwplayer('media-player').getPlaylist());
                //         page.close()
                //         ph.exit()
                //     });
                // } else {
                //     phantom.exit(1);
                // }
            });
        });
    });
}

function urlToOptions(url) {
    return options = {
        method: 'GET',
        url: url,
        headers: {
            'Cache-Control': 'no-cache',
            'User-Agent': 'Macbook Pro'
        }
    };
}
module.exports = router;
