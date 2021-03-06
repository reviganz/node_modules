'use strict'
var test = require('tap').test
var common = require('../common-tap.js')
var path = require('path')
var rimraf = require('rimraf')
var mkdirp = require('mkdirp')
var fs = require('graceful-fs')
var basepath = path.resolve(__dirname, path.basename(__filename, '.js'))
var fixturepath = path.resolve(basepath, 'npm-test-files')
var modulepath = path.resolve(basepath, 'node_modules')
var installedpath = path.resolve(modulepath, 'npm-test-files')
var Tacks = require('tacks')
var File = Tacks.File
var Dir = Tacks.Dir

test('basic file inclusion', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5',
        files: [
          'include',
          'sub/include'
        ]
      }),
      include: File(''),
      sub: Dir({ include: File('') }),
      notincluded: File('')
    })
  )
  withFixture(t, fixture, function (done) {
    t.ok(fileExists('include'), 'toplevel file included')
    t.ok(fileExists('sub/include'), 'nested file included')
    t.notOk(fileExists('notincluded'), 'unspecified file not included')
    done()
  })
})

test('basic file exclusion', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5'
      }),
      '.npmignore': File(
        'ignore\n' +
        'sub/ignore\n'
      ),
      include: File(''),
      ignore: File(''),
      sub: Dir({ ignore: File('') })
    })
  )
  withFixture(t, fixture, function (done) {
    t.notOk(fileExists('ignore'), 'toplevel file excluded')
    t.notOk(fileExists('sub/ignore'), 'nested file excluded')
    t.ok(fileExists('include'), 'unignored file included')
    done()
  })
})

test('toplevel-only and blanket ignores', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5'
      }),
      '.npmignore': File(
        './shallow1\n' +
        '/shallow2\n' +
        '/sub/onelevel\n' +
        'deep\n' +
        ''
      ),
      shallow1: File(''),
      shallow2: File(''),
      deep: File(''),
      sub: Dir({
        shallow1: File(''),
        shallow2: File(''),
        onelevel: File(''),
        deep: File(''),
        sub: Dir({
          deep: File(''),
          onelevel: File('')
        })
      })
    })
  )
  withFixture(t, fixture, function (done) {
    t.notOk(fileExists('shallow2'), '/ file excluded')
    t.ok(fileExists('sub/shallow1'), 'nested ./ file included')
    t.ok(fileExists('sub/shallow2'), 'nested / file included')
    t.ok(fileExists('sub/sub/onelevel'), 'double-nested file included')
    t.notOk(fileExists('sub/onelevel'), 'nested / file excluded')
    t.notOk(fileExists('deep'), 'deep file excluded')
    t.notOk(fileExists('sub/deep'), 'nested deep file excluded')
    t.notOk(fileExists('sub/sub/deep'), 'double-nested deep file excluded')
    t.ok(fileExists('shallow1'), './ file included')
    done()
  })
})

test('.npmignore works for nested directories recursively', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5'
      }),
      '.npmignore': File(
        '/ignore\n' +
        'deep\n'
      ),
      include: File(''),
      ignore: File(''),
      deep: File(''),
      sub: Dir({
        ignore: File(''),
        include: File(''),
        deep: File(''),
        sub: Dir({
          '.npmignore': File(
            '/ignore\n'
          ),
          ignore: File(''),
          include: File(''),
          deep: File('')
        })
      })
    })
  )
  withFixture(t, fixture, function (done) {
    t.notOk(fileExists('ignore'), 'toplevel file excluded')
    t.ok(fileExists('include'), 'unignored file included')
    t.ok(fileExists('sub/ignore'), 'same-name file in nested dir included')
    t.ok(fileExists('sub/include'), 'unignored nested dir file included')
    t.notOk(fileExists('sub/sub/ignore'), 'sub-sub-directory file excluded')
    t.ok(fileExists('sub/sub/include'), 'sub-sube-directory file included')
    t.notOk(fileExists('deep'), 'deep file excluded')
    t.notOk(fileExists('sub/deep'), 'sub-dir deep file excluded')
    t.notOk(fileExists('sub/sub/deep'), 'sub-sub-dir deep file excluded')
    done()
  })
})

test('.gitignore should have identical semantics', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5'
      }),
      '.gitignore': File(
        './shallow1\n' +
        '/shallow2\n' +
        '/sub/onelevel\n' +
        'deep\n' +
        ''
      ),
      shallow1: File(''),
      shallow2: File(''),
      deep: File(''),
      sub: Dir({
        shallow1: File(''),
        shallow2: File(''),
        onelevel: File(''),
        deep: File(''),
        sub: Dir({
          deep: File(''),
          onelevel: File('')
        })
      })
    })
  )
  withFixture(t, fixture, function (done) {
    t.notOk(fileExists('shallow2'), '/ file excluded')
    t.ok(fileExists('sub/shallow1'), 'nested ./ file included')
    t.ok(fileExists('sub/shallow2'), 'nested / file included')
    t.ok(fileExists('sub/sub/onelevel'), 'double-nested file included')
    t.notOk(fileExists('sub/onelevel'), 'nested / file excluded')
    t.notOk(fileExists('deep'), 'deep file excluded')
    t.notOk(fileExists('sub/deep'), 'nested deep file excluded')
    t.notOk(fileExists('sub/sub/deep'), 'double-nested deep file excluded')
    t.ok(fileExists('shallow1'), './ file included')
    done()
  })
})

test('.npmignore should always be overridden by files array', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5',
        files: [
          'include',
          'sub'
        ]
      }),
      '.npmignore': File(
        'include\n' +
        'ignore\n' +
        'sub/included\n'
      ),
      include: File(''),
      ignore: File(''),
      sub: Dir({
        include: File('')
      })
    })
  )
  withFixture(t, fixture, function (done) {
    t.notOk(fileExists('ignore'), 'toplevel file excluded')
    t.ok(fileExists('include'), 'unignored file included')
    t.ok(fileExists('sub/include'), 'nested file included')
    done()
  })
})

test('.gitignore supported for ignores', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5'
      }),
      '.gitignore': File(
        'ignore\n' +
        'sub/ignore\n'
      ),
      include: File(''),
      ignore: File(''),
      sub: Dir({ ignore: File('') })
    })
  )
  withFixture(t, fixture, function (done) {
    t.notOk(fileExists('ignore'), 'toplevel file excluded')
    t.notOk(fileExists('sub/ignore'), 'nested file excluded')
    t.ok(fileExists('include'), 'unignored file included')
    done()
  })
})

test('.npmignore completely overrides .gitignore', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5'
      }),
      '.npmignore': File(
        'ignore\n' +
        'sub/ignore\n'
      ),
      '.gitignore': File(
        'include\n' +
        'sub/include\n' +
        'extra\n'
      ),
      include: File(''),
      sub: Dir({ include: File('') }),
      extra: File('')
    })
  )
  withFixture(t, fixture, function (done) {
    t.ok(fileExists('include'), 'gitignored toplevel file included')
    t.ok(fileExists('extra'), 'gitignored extra toplevel file included')
    t.ok(fileExists('sub/include'), 'gitignored nested file included')
    t.notOk(fileExists('ignore'), 'toplevel file excluded')
    t.notOk(fileExists('sub/ignore'), 'nested file excluded')
    done()
  })
})

test('files array overrides .npmignore', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5',
        files: [
          'include',
          'sub/include'
        ]
      }),
      '.npmignore': File(
        'include\n' +
        'sub/include\n'
      ),
      include: File(''),
      sub: Dir({ include: File('') })
    })
  )
  withFixture(t, fixture, function (done) {
    t.ok(fileExists('include'), 'toplevel file included')
    t.ok(fileExists('sub/include'), 'nested file included')
    done()
  })
})

test('includes files regardless of emptiness', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5',
        files: [
          'full',
          'empty'
        ]
      }),
      full: File('This file has contents~'),
      empty: File('')
    })
  )
  withFixture(t, fixture, function (done) {
    t.ok(fileExists('full'), 'contentful file included')
    t.ok(fileExists('empty'), 'empty file included')
    done()
  })
})

test('.npmignore itself gets included', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5',
        files: [
          '.npmignore'
        ]
      }),
      '.npmignore': File('')
    })
  )
  withFixture(t, fixture, function (done) {
    t.ok(fileExists('.npmignore'), '.npmignore included')
    done()
  })
})

test('include default files when missing files spec', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5'
      }),
      'index.js': File(''),
      foo: File(''),
      node_modules: Dir({foo: Dir({bar: File('')})})
    })
  )
  withFixture(t, fixture, function (done) {
    t.ok(fileExists('index.js'), 'index.js included')
    t.ok(fileExists('foo'), 'foo included')
    t.notOk(fileExists('node_modules'), 'node_modules not included')
    done()
  })
})

test('include main file', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5',
        main: 'foo.js',
        files: []
      }),
      'index.js': File(''),
      'foo.js': File('')
    })
  )
  withFixture(t, fixture, function (done) {
    t.ok(fileExists('foo.js'), 'foo.js included because of main')
    t.notOk(fileExists('index.js'), 'index.js not included')
    done()
  })
})

test('certain files ignored unconditionally', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5',
        files: [
          '.git',
          '.svn',
          'CVS',
          '.hg',
          '.lock-wscript',
          '.wafpickle-0',
          '.wafpickle-5',
          '.wafpickle-50',
          'build/config.gypi',
          'npm-debug.log',
          '.npmrc',
          '.foo.swp',
          '.DS_Store',
          '._ohno'
        ]
      }),
      '.git': Dir({foo: File('')}),
      '.svn': Dir({foo: File('')}),
      'CVS': Dir({foo: File('')}),
      '.hg': Dir({foo: File('')}),
      '.lock-wscript': File(''),
      '.wafpickle-0': File(''),
      '.wafpickle-5': File(''),
      '.wafpickle-50': File(''),
      'build': Dir({'config.gypi': File('')}),
      'npm-debug.log': File(''),
      '.npmrc': File(''),
      '.foo.swp': File(''),
      '.DS_Store': Dir({foo: File('')}),
      '._ohno': File(''),
      '._ohnoes': Dir({noes: File('')})
    })
  )
  withFixture(t, fixture, function (done) {
    t.notOk(fileExists('.git'), '.git not included')
    t.notOk(fileExists('.svn'), '.svn not included')
    t.notOk(fileExists('CVS'), 'CVS not included')
    t.notOk(fileExists('.hg'), '.hg not included')
    t.notOk(fileExists('.lock-wscript'), '.lock-wscript not included')
    t.notOk(fileExists('.wafpickle-0'), '.wafpickle-0 not included')
    t.notOk(fileExists('.wafpickle-5'), '.wafpickle-5 not included')
    t.notOk(fileExists('.wafpickle-50'), '.wafpickle-50 not included')
    t.notOk(fileExists('build/config.gypi'), 'build/config.gypi not included')
    t.notOk(fileExists('npm-debug.log'), 'npm-debug.log not included')
    t.notOk(fileExists('.npmrc'), '.npmrc not included')
    t.notOk(fileExists('.foo.swp'), '.foo.swp not included')
    t.notOk(fileExists('.DS_Store'), '.DS_Store not included')
    t.notOk(fileExists('._ohno'), '._ohno not included')
    t.notOk(fileExists('._ohnoes'), '._ohnoes not included')
    done()
  })
})

test('certain files included unconditionally', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5'
      }),
      '.npmignore': File(
        'package.json',
        'README',
        'Readme',
        'readme.md',
        'readme.randomext',
        'changelog',
        'CHAngelog',
        'ChangeLOG.txt',
        'license',
        'licence',
        'LICENSE',
        'LICENCE'
      ),
      'README': File(''),
      'Readme': File(''),
      'readme.md': File(''),
      'readme.randomext': File(''),
      'changelog': File(''),
      'CHAngelog': File(''),
      'ChangeLOG.txt': File(''),
      'license': File(''),
      'licence': File(''),
      'LICENSE': File(''),
      'LICENCE': File('')
    })
  )
  withFixture(t, fixture, function (done) {
    t.ok(fileExists('package.json'), 'package.json included')
    t.ok(fileExists('README'), 'README included')
    t.ok(fileExists('Readme'), 'Readme included')
    t.ok(fileExists('readme.md'), 'readme.md included')
    t.ok(fileExists('readme.randomext'), 'readme.randomext included')
    t.ok(fileExists('changelog'), 'changelog included')
    t.ok(fileExists('CHAngelog'), 'CHAngelog included')
    t.ok(fileExists('ChangeLOG.txt'), 'ChangeLOG.txt included')
    t.ok(fileExists('license'), 'license included')
    t.ok(fileExists('licence'), 'licence included')
    t.ok(fileExists('LICENSE'), 'LICENSE included')
    t.ok(fileExists('LICENCE'), 'LICENCE included')
    done()
  })
})

test('folder-based inclusion works', function (t) {
  var fixture = new Tacks(
    Dir({
      'package.json': File({
        name: 'npm-test-files',
        version: '1.2.5',
        files: [
          'sub1/sub',
          'sub2'
        ]
      }),
      sub1: Dir({
        sub: Dir({
          include1: File(''),
          include2: File('')
        }),
        ignored: File('')
      }),
      sub2: Dir({
        include1: File(''),
        include2: File(''),
        empty: Dir({})
      })
    })
  )
  withFixture(t, fixture, function (done) {
    t.ok(fileExists('sub1/sub/include1'), 'nested dir included')
    t.ok(fileExists('sub1/sub/include2'), 'nested dir included')
    t.notOk(fileExists('sub1/ignored'), 'unspecified file not included')

    t.ok(fileExists('sub2/include1'), 'dir contents included')
    t.ok(fileExists('sub2/include2'), 'dir contents included')
    t.notOk(fileExists('sub2/empty'), 'empty dir not included')

    done()
  })
})

function fileExists (file) {
  try {
    return !!fs.statSync(path.resolve(installedpath, file))
  } catch (_) {
    return false
  }
}

function withFixture (t, fixture, tester) {
  fixture.create(fixturepath)
  mkdirp.sync(modulepath)
  common.npm(['install', fixturepath], {cwd: basepath}, installCheckAndTest)
  function installCheckAndTest (err, code) {
    if (err) throw err
    t.is(code, 0, 'install went ok')
    tester(removeAndDone)
  }
  function removeAndDone (err) {
    if (err) throw err
    fixture.remove(fixturepath)
    rimraf.sync(basepath)
    t.done()
  }
}
