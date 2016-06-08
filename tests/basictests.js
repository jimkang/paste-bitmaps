var test = require('tape');
var PasteBitmaps = require('../index');

var testCases = [
  {
    name: 'cached-and-not-cached',
    config: {
      pathsToFilesToCache: {
        tree: __dirname + '/data/green-tree.png',
        link: __dirname + '/data/link-one-arm-up.png',         
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
      fs.writeFile(testCase.name + '.png', resultBufer, t.end);    
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
