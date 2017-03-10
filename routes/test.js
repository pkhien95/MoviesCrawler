jwplayer.key = "HOv9YK6egpZgk5ccBiZpYfIAQx3Q5boGV7tiGw==";
var d1yjgnid92211b7q = jwplayer("media-player");
var pga1khoeuss8gk09 = 1;
var sccq36fn8408xw9o = '';
var evajnzsv3huet3dn = 0;
var bvlinkgs2p2ubmav = 0;
var wdhr7uq9qa2h6hh3 = '';
var hll8t1lc7kqz820w = 8;
var zwxqlx35c2gtf99a = '';
var kdynchwuiodj = base_url + "ajax/v2_get_episodes/" + movie.id;
var auto_next = true;
var mklsnchfgdhw = false;
var iosuqhnchsge = false;
var ad_is_shown = false;
var resume_time = 0;
var first_load = true;
var thfq6jcc6pj85tez = 'n1sqcua67bcq9826avrbi6m49vd7shxkn985mhodk06twz87wwxtp3dqiicks2dfyud213k6ygiomq01s94e4tr9v0k887bkyud213k6ygiomq01s94e4tr9v0k887bkqocxzw39esdyfhvtkpzq9n4e7at4kc6k8sxom08bl4dukp16h09oplu7zov4m5f8';
function d4vibvgyvg14rlza() {
    $.get(kdynchwuiodj, function (a) {
        if (a !== '') {
            $("#list-eps").html(a);
            n6gbk7o2i7kkwtss();
            $('#ep-' + wdhr7uq9qa2h6hh3).addClass('active');
            $('#server-' + sccq36fn8408xw9o).addClass('server-active');
            a6jtkv46hhr71s92()
        }
    })
}
function a6jtkv46hhr71s92() {
    var b = uvtxptrsqfhkympr();
    var c = uncensored(wdhr7uq9qa2h6hh3 + thfq6jcc6pj85tez.substring(8, 40), b);
    $.ajax({
        url: base_url + 'ajax/v2_get_sources/' + wdhr7uq9qa2h6hh3 + '?hash=' + encodeURIComponent(c),
        method: 'GET',
        dataType: 'json',
        success: function (a) {
            zwxqlx35c2gtf99a = a.playlist;
            x9yeb9148tz0lpy9()
        }
    })
}
function x9yeb9148tz0lpy9() {
    d1yjgnid92211b7q.setup({
        playlist: zwxqlx35c2gtf99a,
        allowfullscreen: true,
        width: "100%",
        autostart: true,
        aspectratio: "16:9",
        captions: {color: '#f3f378', fontSize: 20, backgroundOpacity: 0, fontfamily: "Helvetica", edgeStyle: "raised"},
        skin: {active: "#79C143", inactive: "white", background: "black"}
    });
    d1yjgnid92211b7q.on('ready', function (e) {
        var a = onetwothree.mobileChecker();
        if (!a) {
            $("#media-player").prepend('<div id="overlay-123plugin-main" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"></div>')
        }
        first_load = true
    });
    d1yjgnid92211b7q.on('setupError', function (e) {
        nchsmeuilods()
    });
    d1yjgnid92211b7q.on('play', function () {
        if (first_load) {
            b1mi99g9jbmk();
            first_load = false
        }
        d1yjgnid92211b7q.setCurrentCaptions(pga1khoeuss8gk09);
        if (mklsnchfgdhw) {
            mklsnchfgdhw = false;
            d1yjgnid92211b7q.seek(evajnzsv3huet3dn)
        }
    });
    d1yjgnid92211b7q.on('pause', function () {
        pga1khoeuss8gk09 = d1yjgnid92211b7q.getCurrentCaptions()
    });
    d1yjgnid92211b7q.on('time', function (e) {
        var a = onetwothree.mobileChecker();
        if (!a) {
            evajnzsv3huet3dn = d1yjgnid92211b7q.getPosition();
            var b = onetwothree.adTime();
            if (parseInt(evajnzsv3huet3dn) == b.start && !ad_is_shown) {
                onetwothree.addTag();
                ad_is_shown = true
            }
            if (parseInt(evajnzsv3huet3dn) == b.end && ad_is_shown) {
                onetwothree.removeTag()
            }
        }
        localStorage.setItem(wdhr7uq9qa2h6hh3, d1yjgnid92211b7q.getPosition())
    });
    d1yjgnid92211b7q.on('seek', function (e) {
        evajnzsv3huet3dn = e.offset
    });
    d1yjgnid92211b7q.on('complete', function () {
        if (auto_next && parseInt(movie.total_episode) > 0) {
            oz6xsieht7dners5()
        }
    });
    d1yjgnid92211b7q.on('error', function (e) {
        if (evajnzsv3huet3dn > 0 && !iosuqhnchsge) {
            mklsnchfgdhw = true;
            d1yjgnid92211b7q.load(zwxqlx35c2gtf99a)
        } else {
            nchsmeuilods()
        }
    })
}
function nchsmeuilods() {
    if (lfu29lqxebwry6k2()) {
        loadEpisode(sccq36fn8408xw9o, wdhr7uq9qa2h6hh3)
    } else {
        if (!y3hghl7tacziujtm()) {
            hvepwurkxj0t3g8v()
        }
    }
}
function bkyud213() {
    var a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var b = 16;
    var c = '';
    for (var i = 0; i < b; i++) {
        var d = Math.floor(Math.random() * a.length);
        c += a.substring(d, d + 1)
    }
    return c
}
function uvtxptrsqfhkympr() {
    var a = bkyud213();
    var b = md5(wdhr7uq9qa2h6hh3 + thfq6jcc6pj85tez.substring(46, 58));

    $.cookie(b, a, {path: '/'});
    return a
}
function lfu29lqxebwry6k2() {
    var a = false;
    for (var i = (sccq36fn8408xw9o - 1); i > 0; i--) {
        if ($('#server-' + i).length > 0) {
            var b = $('#server-' + i + ' .les-content .btn-eps').get(bvlinkgs2p2ubmav);
            if (b) {
                wdhr7uq9qa2h6hh3 = $(b).attr('episode-id');
                sccq36fn8408xw9o = i;
                a = true;
                break
            }
        }
    }
    return a
}
function oz6xsieht7dners5() {
    evajnzsv3huet3dn = 0;
    bvlinkgs2p2ubmav = bvlinkgs2p2ubmav + 1;
    var a = $('.server-active .les-content .btn-eps').get(bvlinkgs2p2ubmav);
    a.click()
}
function hvepwurkxj0t3g8v() {
    var a = false;
    var b = [14, 13, 12, 15];
    for (var i = 0; i < b.length; i++) {
        if ($('#server-' + b[i]).length > 0 && $('#server-' + b[i] + ' .les-content .btn-eps').get(bvlinkgs2p2ubmav)) {
            sccq36fn8408xw9o = b[i];
            a = true;
            break
        }
    }
    if (a) {
        var c = $('#server-' + sccq36fn8408xw9o + ' .les-content .btn-eps').get(bvlinkgs2p2ubmav);
        wdhr7uq9qa2h6hh3 = $(c).attr('episode-id');
        cj0evqh1jz5m98al(wdhr7uq9qa2h6hh3);
        $('.btn-eps').removeClass('active');
        $('.le-server').removeClass('server-active');
        $('#ep-' + wdhr7uq9qa2h6hh3).addClass('active');
        $('#server-' + sccq36fn8408xw9o).addClass('server-active')
    }
}
function au8r866h4hbz0ynw() {
    iosuqhnchsge = true;
    var a = $('#server-backup').attr('data-episodes');
    var b = a.split(",");
    var c = b[bvlinkgs2p2ubmav];
    c = c.split("-");
    wdhr7uq9qa2h6hh3 = c[0];
    a6jtkv46hhr71s92()
}
function y3hghl7tacziujtm() {
    if ($('#server-backup').length > 0 && !iosuqhnchsge) {
        au8r866h4hbz0ynw();
        return true
    }
    return false
}
function n6gbk7o2i7kkwtss() {
    if ($('#server-' + hll8t1lc7kqz820w).length > 0) {
        wdhr7uq9qa2h6hh3 = $('#server-' + hll8t1lc7kqz820w + ' a.first-ep').attr('episode-id');
        sccq36fn8408xw9o = hll8t1lc7kqz820w
    } else {
        var a = false;
        for (var i = 10; i > 3; i--) {
            if ($('#server-' + i).length > 0 && i !== hll8t1lc7kqz820w) {
                a = true;
                wdhr7uq9qa2h6hh3 = $('#server-' + i + ' a.first-ep').attr('episode-id');
                sccq36fn8408xw9o = i;
                break
            }
        }
        if (!a) {
            hvepwurkxj0t3g8v()
        }
    }
}
function cj0evqh1jz5m98al(b) {
    $.ajax({
        url: base_url + 'ajax/load_embed/' + b, type: 'GET', dataType: 'json', success: function (a) {
            $('#iframe-embed').attr('src', a.embed_url);
            $('#media-player').hide();
            $('#content-embed').show()
        }
    })
}
function b1mi99g9jbmk() {
    if (localStorage.getItem(wdhr7uq9qa2h6hh3) && !iosuqhnchsge && localStorage.getItem(wdhr7uq9qa2h6hh3) > 20) {
        resume_time = localStorage.getItem(wdhr7uq9qa2h6hh3);
        setTimeout(function () {
            d1yjgnid92211b7q.pause();
            localStorage.setItem(wdhr7uq9qa2h6hh3, resume_time);
            $('#time-resume').text(convert_time(resume_time));
            $('#pop-resume').modal('show')
        }, 2000)
    }
}
function yes_resume() {
    $('#pop-resume').modal('hide');
    d1yjgnid92211b7q.seek(resume_time)
}
function no_resume() {
    $('#pop-resume').modal('hide');
    d1yjgnid92211b7q.play()
}
function convert_time(a) {
    var d = new Date(0, 0, 0);
    d.setSeconds(+a);
    var b = d.getHours();
    var c = d.getMinutes();
    var e = d.getSeconds();
    return (b < 10 ? ("0" + b) : b) + ":" + (c < 10 ? ("0" + c) : c) + ':' + (e < 10 ? ("0" + e) : e)
}
function autoNext() {
    if (auto_next) {
        auto_next = false;
        $('#state-auto-next').text('Auto next: OFF')
    } else {
        auto_next = true;
        $('#state-auto-next').text('Auto next: ON')
    }
}
function loadEpisode(a, b) {
    $('.btn-eps').removeClass('active');
    $('.le-server').removeClass('server-active');
    $('#ep-' + b).addClass('active');
    $('#server-' + a).addClass('server-active');
    iosuqhnchsge = false;
    bvlinkgs2p2ubmav = $('#server-' + a + ' .btn-eps').index($('#ep-' + b));
    wdhr7uq9qa2h6hh3 = b;
    sccq36fn8408xw9o = a;
    evajnzsv3huet3dn = 0;
    if (a == 12 || a == 13 || a == 14 || a == 15) {
        d1yjgnid92211b7q.stop();
        cj0evqh1jz5m98al(b)
    } else {
        $('#media-player').show();
        $('#iframe-embed').attr('src', '');
        $('#content-embed').hide();
        d1yjgnid92211b7q.stop();
        a6jtkv46hhr71s92()
    }
}

d4vibvgyvg14rlza();