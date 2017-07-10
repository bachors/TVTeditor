# TVTeditor
TreeView Text Editor web based using Codemirror, Enhsplitter & Fontawesome.

<h3>Example:</h3>
<p><code>dir_json.php</code></p>
<pre>&lt;?php

header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: http://your-domain.com');

// Include class tvteditor.php
include_once('lib/TVTeditor.php');

// nama folder yang akan di scan.
// $dir = 'dir1/dir2';
$dir = './';

$tvteditor =  new TVTeditor($dir);

// Scan direktori
if(isset($_POST['path'])){

    // Jalankan fungsi scan-&gt;('SUB DIR NAME')
    $res = $tvteditor-&gt;scan($_POST['path']);
    
    // Output list direktori &amp; file dalam format JSON
    echo json_encode($res);
    
}

// Read file
else if(!empty($_POST['file'])){

    $res = $tvteditor-&gt;read($_POST['file']);
    
    // Output isi file
    echo json_encode($res);

}

// Update file
else if(!empty($_POST['update'])){

    $isi = (empty($_POST['isi']) ? '' : $_POST['isi']);
    $res = $tvteditor-&gt;update($_POST['update'], $isi);
    
    echo json_encode($res);

}</pre>
<br>

<h3>Usage:</h3>
<p>CSS</p>
<pre>&lt;!-- Fontawesome --&gt;
&lt;link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"&gt;

&lt;!-- Codemirror --&gt;
&lt;link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/codemirror.min.css"&gt;
&lt;link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/addon/dialog/dialog.min.css"&gt;
&lt;link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/theme/icecoder.min.css"&gt;

&lt;!-- enhsplitter --&gt;
&lt;link type="text/css" rel="stylesheet" href="src/css/jquery.enhsplitter.css"/&gt;

&lt;!-- Custom Style --&gt;
&lt;link type="text/css" rel="stylesheet" href="src/css/tvteditor.css" /&gt;</pre>
<br>
<p>HTML</p>
<pre>&lt;div id="tvteditor"&gt;&lt;/div&gt;</pre>
<br>
<p>JS</p>
<pre>&lt;!-- Codemirror --&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/codemirror.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/mode/xml/xml.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/mode/javascript/javascript.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/mode/css/css.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/mode/clike/clike.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/mode/php/php.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/mode/ruby/ruby.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/mode/python/python.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/mode/vb/vb.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/mode/htmlmixed/htmlmixed.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/addon/dialog/dialog.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/addon/search/searchcursor.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/addon/search/search.min.js"&gt;&lt;/script&gt;

&lt;!-- jQuery --&gt;
&lt;script src="//code.jquery.com/jquery-2.1.1.min.js"&gt;&lt;/script&gt;

&lt;!-- enhsplitter.js --&gt;
&lt;script src="src/js/jquery.enhsplitter.js"&gt;&lt;/script&gt;

&lt;!-- tvteditor.js --&gt;
&lt;script src="src/js/tvteditor.js"&gt;&lt;/script&gt;
&lt;script&gt;
$(document).ready(function(){

    tvteditor({
    
        // your host / domain
        host: 'http://localhost/tvteditor/',

        // api
        api: 'dir_json.php', 

        // icon: http://fontawesome.io/icons/
        // mode: https://codemirror.net/mode/
        file: {
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
        }

    });

});
&lt;/script&gt;</pre>
<br>

<h3><a href="http://bachors.com/gallery/treeview-text-editor-web-based-using-codemirror">DEMO</a></h3>
