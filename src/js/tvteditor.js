/*******************************************
* #### TVTeditor v0.0.1 ####
* Coded by Ican Bachors 2017.
* http://ibacor.com/labs/tvteditor
* Updates will be posted to this site.
*******************************************/

var tvteditor = function(g) {
    var f = '';
    var k = {
        html: {
            icon: 'file-code-o',
            mode: 'text/html'
        },
        css: {
            icon: 'file-code-o',
            mode: 'text/css'
        },
        js: {
            icon: 'file-code-o',
            mode: 'text/javascript'
        },
        php: {
            icon: 'file-code-o',
            mode: 'application/x-httpd-php'
        },
        json: {
            icon: 'file-code-o',
            mode: 'application/json'
        },
        txt: {
            icon: 'file-code-o',
            mode: 'application/json'
        },
        asp: {
            icon: 'file-code-o',
            mode: 'text/x-vb'
        },
        aspx: {
            icon: 'file-code-o',
            mode: 'text/x-vb'
        },
        jsp: {
            icon: 'file-code-o',
            mode: 'text/x-java'
        },
        rb: {
            icon: 'file-code-o',
            mode: 'text/x-ruby'
        },
        py: {
            icon: 'file-code-o',
            mode: 'text/x-python'
        }
    };
    g.file = (g.file == undefined ? k : g.file);
    if (g.host != undefined && g.api != undefined && g.host != '' && g.api != '') {
        var j = '<div class="tvteditor_direktori"><div class="tvteditor_header"><span class="title"><a href="http://github.com/bachors/TVTeditor" target="_BLANK">TVTeditor</a></span></div>' + '<div class="tvteditor_tree"></div></div>' + '<div class="tvteditor_file_editor"><div class="tvteditor_header"><span class="title"><span id="rf"></span><span><i class="fa fa-floppy-o" id="tvteditor_save" title="Save"></i></div>' + '<textarea id="tvteditor_text"></textarea></div>';
        $("#tvteditor").html(j);
        tvteditor_direktori("", "");
        var h = CodeMirror.fromTextArea(document.getElementById("tvteditor_text"), {
            mode: "text/html",
            lineNumbers: true,
            theme: "icecoder"
        });
        $('#tvteditor').enhsplitter({
            vertical: true
        })
    } else {
        alert('Options required.')
    }
    $("body").on('click', '.sub', function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).parent().children('ul').slideToggle('fast');
        if ($(this).data("red") == 'yes') {
            var t = $(this).data("sub");
            var a = '#' + $(this).attr("id");
            $(this).data("red", "no");
            tvteditor_direktori(t, a)
        }
    });
    $("body").on('click', '.rfile', function(e) {
        e.preventDefault();
        $('.rfile').removeClass("aktip");
        $(this).addClass("aktip");
        var a = $(this).data("rfile");
        tvteditor_file(a, $(this).data("mode"))
    });
    $("body").on('click', '#tvteditor_save', function(e) {
        e.preventDefault();
        if (f == '') {
            alert('Choose file.')
        } else {
            $.ajax({
                type: "POST",
                url: g.host + g.api,
                data: 'update=' + f + '&isi=' + h.getValue(),
                crossDomain: true,
                dataType: "json"
            }).done(function(a) {
                if (a.status == 'success') {
                    alert('Suceess saved.')
                } else {
                    alert('Failed saved.')
                }
            })
        }
    });

    function tvteditor_direktori(e, h) {
        $.ajax({
            type: "POST",
            url: g.host + g.api,
            data: 'path=' + e,
            crossDomain: true,
            dataType: "json"
        }).done(function(c) {
            if (c.status == 'success') {
                var d = '',
                    fi = '';
                $.each(c.data, function(i, a) {
                    if (c.data[i].type == "dir") {
                        if (c.data[i].items == '0') {
                            d += '<li class="parent empty"><a title="0 items\nModified: ' + c.data[i].modif + '">' + c.data[i].name + '</a></li>'
                        } else {
                            d += '<li class="parent"><a title="' + c.data[i].items + ' items\nModified: ' + c.data[i].modif + '" class="sub" id="' + tvteditor_slug(c.data[i].path) + '" data-red="yes" data-sub="' + c.data[i].path + '"><i class="fa fa-folder"></i> ' + c.data[i].name + '</a></li>'
                        }
                    } else {
                        var b = tvteditor_size(c.data[i].size);
                        var s = c.data[i].path.substr(c.data[i].path.lastIndexOf(".") + 1);
                        if (g.file[s] != undefined) {
                            fi += '<li class="parent empty"><a title="Size: ' + b + '\nModified: ' + c.data[i].modif + '" class="rfile" data-mode="' + s + '" data-rfile="' + c.data[i].path + '"><i class="fa fa-' + g.file[s].icon + '"></i> ' + c.data[i].name + '</a></li>'
                        } else {
                            fi += '<li class="parent empty"><a href="' + g.host + c.data[i].dir + '/' + c.data[i].path + '" target="_BLANK" title="Size: ' + b + '\nModified: ' + c.data[i].modif + '">' + c.data[i].name + '</a></li>'
                        }
                    }
                });
                if (h == '') {
                    $('.tvteditor_tree').html('<ul>' + d + fi + '</ul>')
                } else {
                    $('<ul>' + d + fi + '</ul>').insertAfter(h)
                }
            }
        })
    }

    function tvteditor_file(c, b) {
        $.ajax({
            type: "POST",
            url: g.host + g.api,
            data: 'file=' + c,
            crossDomain: true,
            dataType: "json"
        }).done(function(a) {
            if (a.status == 'success') {
                f = c;
                $("#rf").html(c.replace(/\//ig, ' / '));
                h.setValue(a.text);
                if (g.file[b] != undefined) {
                    h.setOption("mode", g.file[b].mode)
                }
            }
        })
    }

    function tvteditor_size(e) {
        var t = ["Bytes", "KB", "MB", "GB", "TB"];
        if (e == 0) return "0 Bytes";
        var n = parseInt(Math.floor(Math.log(e) / Math.log(1024)));
        return Math.round(e / Math.pow(1024, n), 2) + " " + t[n]
    }

    function tvteditor_slug(a) {
        return a.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')
    }
}