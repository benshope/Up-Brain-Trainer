(function() {
  module.exports = function(grunt) {
    var baseConfig;
    baseConfig = {
      dir: {
        bower: 'bower_components',
        compile: 'compile',
        dist: 'dist',
        src: 'src',
        tasks: 'tasks'
      }
    };
    require('load-grunt-config')(grunt, {
      configPath: "" + __dirname + "/tasks/config",
      config: baseConfig
    });
    require('load-grunt-tasks')(grunt);
    return grunt.loadTasks(baseConfig.dir.tasks);
  };

}).call(this);
