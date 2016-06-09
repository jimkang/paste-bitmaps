paste-bitmaps
==================

Pastes bitmaps together for you using Jimp.

Installation
------------

    npm install paste-bitmaps

Usage
-----

    var PasteBitmaps = require('paste-bitmaps');
    var fs = require('fs');

    var configOpts = {
      pathsToFilesToCache: {
        smidgeo_headshot: 'http://smidgeo.com/images/smidgeo_headshot.jpg',
        smidgeo_on_the_move: 'http://smidgeo.com/images/smidgeo_on_the_move.png',
        tree: __dirname + '/data/green-tree.png',
        link: __dirname + '/data/link-one-arm-up.png'
      }
    };
    PasteBitmaps(configOpts, startPasting);

    function startPasting(error, pasteBitmaps) {
      if (error) {
        console.log(error, error.stack);
      }
      else {
        var pasteOpts = {
          background: {
            width: 1024,
            height: 768,
            fill: 0XFEDBABFF
          },
          images: [
            {
              url: 'http://nonstopscrollshop.com/res/nonstopscrollshop.png',
              x: 256,
              y: 256
            },
            {
              cacheId: 'smidgeo_headshot',
              x: 800,
              y: 512
            },
            {
              cacheId: 'smidgeo_on_the_move',
              x: 0,
              y: 128
            },
            {
              cacheId: 'smidgeo_on_the_move',
              x: 480,
              y: 0
            },
            {
              cacheId: 'tree',
              x: 100,
              y: 100
            },
            {
              cacheId: 'tree',
              x: 700,
              y: 500
            },
            {
              cacheId: 'tree',
              x: 1000,
              y: 600
            },
            {
              cacheId: 'link',
              x: 512,
              y: 384
            },
            {
              filePath: __dirname + '/data/fairy.png',
              x: 600,
              y: 256
            },
            {
              filePath: __dirname + '/data/fairy.png',
              x: 0,
              y: 384
            },
            {
              filePath: __dirname + '/data/moblin.png',
              x: 192,
              y: 1024
            }
          ]
        };
        pasteBitmaps(pasteOpts, saveResult);
      }
    }

    function saveResult(error, resultBuffer) {
      if (error) {
        console.log(error, error.stack);
      }
      else {
        fs.writeFile('result.png', resultBufer, done);
      }
    }

Tests
-----

Run tests with 'make test'.

License
-------

The MIT License (MIT)

Copyright (c) 2016 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
