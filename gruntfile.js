"use strict";

module.exports = function (grunt) {

  grunt.initConfig({

    mochaTest: {
      options: {
        reporter: 'spec',
        clearRequireCache: false
      },
      src: ['test/**/*.js']
    },

    watch: {
      files: ['test/**/*.js','module.sql','lib/**/*.sql','test/**/*.sql'],
      tasks: ['mochaTest'],
      options: {
        spawn: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['test', 'watch']);
  grunt.registerTask('test', ['mochaTest']);

};
