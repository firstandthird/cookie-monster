module.exports = function(grunt) {
  grunt.initConfig({
    info: '<json:package.json>',
    meta: {
      banner: '/*!\n'+
              ' * <%= info.name %> - <%= info.description %>\n'+
              ' * v<%= info.version %>\n'+
              ' * <%= info.homepage %>\n'+
              ' * copyright <%= info.copyright %> <%= grunt.template.today("yyyy") %>\n'+
              ' * <%= info.license %> License\n'+
              '*/'
    },
    lint: {
      all: 'lib/monster.js'
    },
    concat: {
      dist: {
        src: ['<banner>', 'lib/monster.js'],
        dest: 'dist/monster.js'
      },
    },
    min: {
      dist: {
        src: ['<banner>', 'dist/monster.js'],
        dest: 'dist/monster.min.js'
      }
    },
    simplemocha: {
      all: {
        src: 'test/**/*.test.js',
        options: {
          ui: 'bdd',
          reporter: 'list',
          growl: true
        }
      }
    },
    watch: {
      js: {
        files: ['lib/monster.js', 'test/*'],
        tasks: 'concat min' 
      }
    },
    server:{
      port: 8000,
      base: '.'
    }
  });
  grunt.registerTask('default', 'lint concat min');
  grunt.registerTask('dev', 'server watch');
}
