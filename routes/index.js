var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var phantom = require('phantom');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var encode = require('./encode');

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

router.get("/sele", function (req, res) {
    var url = "https://123movies.is/film/lucha-underground-season-1-19666/watching.html"
    testSelenium(url, function (src) {
        res.send(src);
    });
});

router.get("/crawl", function (req, res) {
    var url = "https://123movies.is/movie/filter/all/latest/all/all/all/all/all/1";
    crawl(url, function (movieList) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(movieList, null, 3));
    })
});

router.get("/watch", function (req, res) {
    var epId = req.query.epId;
    getEpisodeUrl(epId, function (result) {
        if (result != '') {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(result, null, 3));
        }
        else {
            res.send('No URL')
        }
    });
});

function crawl(url, callback) {
    var result = [];
    request(urlToOptions(url), function (err, response, html) {
        var $ = cheerio.load(html);
        var moviesListDiv = $('.movies-list');
        moviesListDiv.each(function (index) {
            var movieList = $(this).children().find("a");
            movieList.each(function (i) {
                var movie = {
                    title: "",
                    watchLink: "",
                    thumb: "",
                    movieInfo: ""
                };
                movie.title = $(this).attr('title');
                movie.watchLink = $(this).attr('href');
                movie.thumb = $(this).children("img").attr("data-original");
                setTimeout(function () {
                    getMovieInfo(urlToOptions(movie.watchLink), function (movieInfo) {
                        movie.movieInfo = movieInfo;

                        result.push(movie);

                        if (result.length == movieList.length) {
                            callback(result);
                            return;
                        }
                        // getVideoLink(movie.watchLink, function (videoURL) {
                        //     movie.watchLink = videoURL;
                        //
                        // });
                    });
                }, 300);
            });
        })
    });
}

function getMovieInfo(options, callback) {
    request(options, function (err, response, html) {
        var $ = cheerio.load(html);
        var data = $(this);
        var movieInfo = {
            genre: [],
            actor: [],
            director: [],
            country: [],
            trailer: "",
            description: "",
            length: '',
            year: '',
            quality: '',
            rating: ''
        };

        var leftContainer = $('.mvici-left');
        leftContainer.children('p').eq(0).find('a').each(function (index, element) {
            movieInfo.genre.push($(this).attr('title'));
        });
        leftContainer.children('p').eq(1).find('a').each(function (index, element) {
            movieInfo.actor.push($(this).attr('title'));
        });
        leftContainer.children('p').eq(2).find('a').each(function (index, element) {
            movieInfo.director.push($(this).attr('title'));
        });
        leftContainer.children('p').eq(3).find('a').each(function (index, element) {
            movieInfo.country.push($(this).attr('title'));
        });

        var rightContainer = $('.mvici-right');
        var episodeText = rightContainer.children('p').eq(0).text().replace("\<strong>Episode:</strong>", '');
        console.log(episodeText);
        movieInfo.length = rightContainer.children('p').eq(1).text().replace("\<strong>Duration:</strong>", '');
        movieInfo.quality = rightContainer.children('p').eq(2).find('span').first().text();
        mInfo.year = rightContainer.children('p').eq(3).text().replace("\<strong>Release:</strong>", '');

        callback(movieInfo);
    })
}

function testPhantom() {
    phantom.create().then(function (ph) {
        ph.createPage().then(function (page) {
            var url = "https://123movies.is/film/chicago-justice-season-1-19661/watching.html";
            page.open(url).then(function (status) {
                console.log(status);
                if (status !== 'success') {
                    console.log('Unable to load the address!');
                    ph.exit();
                } else {
                    page.setting('javascriptEnabled').then(function (value) {
                        expect(value).toEqual(true);
                    });

                    page.on('onInitialized', function () {
                        page.evaluate(function () {
                            window.navigator = {
                                plugins: {"Shockwave Flash": {description: "Shockwave Flash 11.2 e202"}},
                                mimeTypes: {"application/x-shockwave-flash": {enabledPlugin: true}}
                            };
                        }).then(function (result) {

                        });
                    });

                    setTimeout(function () {
                        // page.property('content').then(function (content) {
                        //     console.log(content);
                        //     page.close();
                        //     ph.exit();
                        // });


                        page.evaluateJavaScript('function() { return jwplayer("media-player").getPlaylist(); }').then(function (object) {
                            console.log(object);
                        });
                    }, 20000); // Change timeout as required to allow sufficient time
                }
            });
        });
    });
}

function testSelenium(url, callback) {
    var webdriver = require('selenium-webdriver');

    // var options = new ChromeOptions();
    // options.addArguments("--test-type");

    var driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();


    driver.get(url);
    // setTimeout(function () {
    //
    // // }, 1000);
    var video = driver.findElement(webdriver.By.tagName('video'));
    video.getAttribute('src')
        .then(function (src) {
            callback(src)
        });
    driver.quit();
}


var testResult = function (html) {

    console.log(html);
}

function checkReadyState(page, callback) {
    setTimeout(function () {
        var readyState = page.evaluate(function () {
            return document.readyState;
        });

        if ("complete" === readyState) {
            callback()
        } else {
            checkReadyState();
        }
    });
}

function getEpisodeUrl(epId, callback) {
    var hash = encode.getHash(epId);
    var cookie = encode.getCookie(epId);

    var options = {
        method: 'GET',
        url: 'https://123movies.is/ajax/v2_get_sources/' + epId + '?hash=' + hash,
        headers: {
            cookie: cookie,
            'cache-control': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36'
        }
    };
    var result = [];

    request(options, function (err, response, body) {
            if (err) throw  err;
            else {
                if (body != '') {
                    body = JSON.parse(body);
                    var sources = body.playlist[0].sources;
                    sources.forEach(function (source) {
                        result.push(source.file);
                    });
                    callback(result);
                }
                else {
                    callback('');
                }
            }
        }
    )
    ;
}

function urlToOptions(url) {
    return options = {
        method: 'GET',
        url: url,
        headers: {
            'Cache-Control': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36'
        }
    };
}

module.exports = router;
