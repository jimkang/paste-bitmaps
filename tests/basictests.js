var test = require('tape');
var PasteBitmaps = require('../index');
var fs = require('fs');
var Jimp = require('jimp');

var testCases = [
  {
    name: 'cached-and-not-cached',
    config: {
      pathsToFilesToCache: {
        tree: __dirname + '/data/green-tree.png',
        link: __dirname + '/data/link-one-arm-up.png'
      }
    },
    opts: {
      background: {
        width: 1024,
        height: 768,
        fill: 0XFEDBABFF
      },
      images: [
        {
          cacheId: 'tree',
          x: 100,
          y: 100
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
        }
      ]
    }
  },

  {
    name: 'nothing-cached',
    config: {
    },
    opts: {
      background: {
        width: 256,
        height: 1280,
        fill: 0X002200FF
      },
      images: [
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
    }
  },

  {
    name: 'from-the-internet',
    config: {
      pathsToFilesToCache: {
        smidgeo_headshot: 'http://smidgeo.com/images/smidgeo_headshot.jpg',
        smidgeo_on_the_move: 'http://smidgeo.com/images/smidgeo_on_the_move.png'
      }
    },
    opts: {
      background: {
        width: 512,
        height: 512,
        fill: 0X222222FF
      },
      images: [
        {
          url: 'http://nonstopscrollshop.com/res/nonstopscrollshop.png',
          x: 256,
          y: 256
        },
        {
          cacheId: 'smidgeo_headshot',
          x: 256,
          y: 480
        },
        {
          cacheId: 'smidgeo_headshot',
          x: 256,
          y: 96
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
        }
      ]
    }
  },

  {
    name: 'README',
    config: {
      pathsToFilesToCache: {
        smidgeo_headshot: 'http://smidgeo.com/images/smidgeo_headshot.jpg',
        smidgeo_on_the_move: 'http://smidgeo.com/images/smidgeo_on_the_move.png',
        tree: __dirname + '/data/green-tree.png',
        link: __dirname + '/data/link-one-arm-up.png'
      }
    },
    opts: {
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
    }
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test(testCase.name, function basicTest(t) {
    PasteBitmaps(testCase.config, startPasting);

    function startPasting(error, pasteBitmaps) {
      assertNoError(t, error, 'No error while constructing pasteBitmaps.');
      pasteBitmaps(testCase.opts, checkResult);
    }

    function checkResult(error, resultBuffer) {
      assertNoError(t, error, 'No error while pasting.');
      var filename = testCase.name + '.png.';
      console.log('Writing', filename, '- please visually inspect for problems.');
      fs.writeFile('tests/test-output/' + testCase.name + '.png', resultBuffer, t.end);
    }
  });
}

function assertNoError(t, error, message) {
  t.ok(!error, message);
  if (error) {
    console.log(error);
    if (error.stack) {
      console.log(error.stack);
    }
  }
}

test('Use Jimp image directly', useJimpImageDirectlyTest);

function useJimpImageDirectlyTest(t) {
  Jimp.read(__dirname + '/data/link-one-arm-up.png', useImage);

  function useImage(error, linkImage) {
    assertNoError(t, error, 'No error while loading test image.');
    var config = {
      pathsToFilesToCache: {
        smidgeo_headshot: 'http://smidgeo.com/images/smidgeo_headshot.jpg',
        smidgeo_on_the_move: 'http://smidgeo.com/images/smidgeo_on_the_move.png'
      }
    };

    PasteBitmaps(config, startPasting);  

    function startPasting(error, pasteBitmaps) {
      assertNoError(t, error, 'No error while constructing pasteBitmaps.');
      var opts = {
        background: {
          width: 1024,
          height: 768,
          fill: 0XFEDBABFF
        },
        images: [
          {
            cacheId: 'smidgeo_headshot',
            x: 100,
            y: 100
          },
          {
            cacheId: 'smidgeo_on_the_move',
            x: 500,
            y: 400
          },
          {
            filePath: __dirname + '/data/fairy.png',
            x: 600,
            y: 256
          },
          {
            jimpImage: linkImage,
            x: 512,
            y: 384
          }
        ]
      };
      
      pasteBitmaps(opts, checkResult);
    }
  }

  function checkResult(error, resultBuffer) {
    assertNoError(t, error, 'No error while pasting.');
    var filename = 'use-jimp-image-directly' + '.png';
    console.log('Writing', filename, '- please visually inspect for problems.');
    fs.writeFile('tests/test-output/' + filename, resultBuffer, t.end);
  }
}
