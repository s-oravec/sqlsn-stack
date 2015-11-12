'use strict';

var chalk = require('chalk');
var shell = require('shelljs');
var Bluebird = require('bluebird');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var _ = require('lodash');
chai.should();
chai.use(chaiAsPromised);

chai.should();
shell.config.silent = true;

describe('SQLSN Stack', function() {

  this.timeout(50000);

  beforeEach(function(){
    shell.pushd('test/sql');
  });

  var sqlplusOutputShouldMatch = function(output) {
    // 0. replace [ and ] in *.test.sql with "
    // 1. split output on \n into linesArray
    // 2. split output on " into linePartsArray
    // 3. linePartsArray[1].should.be.equal(linePartsArray[3])
    _.forEach(output.split('\n'), function(line) {
      var linePartsArray = line.split('"');
      if (linePartsArray.length === 5) {
        linePartsArray[1].should.be.equal(linePartsArray[3]);
      }
    });
  };

  it('should load stack module', function(done) {
    shell.exec('sql /nolog @stack_module_should_load.test.sql', function(code, output) {
      code.should.be.equal(0);
      output.should.match(/module sqlsn-stack successfully loaded/g);
      output.should.match(/command stack_create \[\.\.\/\.\.\/lib\/command\/create\.sql\] should be defined/g);
      output.should.match(/command stack_push \[\.\.\/\.\.\/lib\/command\/push\.sql\] should be defined/g);
      output.should.match(/command stack_pop \[\.\.\/\.\.\/lib\/command\/pop\.sql\] should be defined/g);
      done();
    });
  });

  it('stack_create should create empty stack', function(done) {
    shell.exec('sql /nolog @create_should_work.test.sql', function(code, output) {
      code.should.be.equal(0);
      sqlplusOutputShouldMatch(output);
      done();
    });
  });

  it('stack_push should push value on stack', function(done) {
    shell.exec('sql /nolog @push_should_work.test.sql', function(code, output) {
      code.should.be.equal(0);
      sqlplusOutputShouldMatch(output);
      done();
    });
  });

});
