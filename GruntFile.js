module.exports = function(grunt) {

	'use strict';

	// Load grunt tasks automatically
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var plugins = [];
	var browsers = [];


	// Define the configuration for all the tasks
	grunt.initConfig({
		// Next we can read in the project settings from the package.json file into the pkg property. This allows us to refer to the values of properties within our package.json file.
		pkg: grunt.file.readJSON('package.json'),

		// Project settings
		pic: {
			// Configurable paths
			app: 'src',
			dist: 'dist',
			test: 'test'
		},
		// Empties folders to start fresh
		/*clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= pic.dist %>/*',
						'!<%= pic.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},*/

		 uglify: {
		     options: {
		         // The banner is inserted at the top of the output
		         banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		     },
		     dist: { // Target
		         files: { // Dictionary of files
		             'dist/js/<%= pkg.name %>.min.js': ['src/js/*.js']
		         }
		     }
		 },

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			// Define the files to lint
			all: [
				'Gruntfile.js',
				'<%= pic.app %>/js/*.js'
			],
			// Configure JSHint (documented at http://www.jshint.com/docs/)
			options: {
				'esversion': 6
				// More options here if you want to override JSHint defaults
				//jshintrc: '.jshintrc'
			}
		},


		jsdoc: {
			dist: {
				src: ['<%= pic.app %>/js/*.js'],
				options: {
					destination: '<%= pic.dist %>/doc'
				}
			}
		},
	});
	//

	/* Don't need to load the individual tasks anymore as we have been using
    'matchdep' task in the start to load all the tasks from node_modules automatically */

	// Let's set up some tasks
	/*grunt.registerTask('server', [
		'open',
		'connect:client',
		'watch:client',
	]);*/

	// The default task can be run just by typing "grunt" on the command line
	grunt.registerTask('default', [
		//'clean:dist',
		'jshint',
		//'concat',
		'uglify'
	]);


	// Let's generate the JavaScript documentation
	grunt.registerTask('js-doc', [
		'jsdoc'
	]);

	grunt.registerTask('test', [
		'jshint'
	]);

	// To debug the values
	// grunt.event.on('watch', function(action, filepath, target) {
	// grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	// });

};
