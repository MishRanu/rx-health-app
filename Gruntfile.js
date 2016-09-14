#!/usr/bin/env node
'use strict'

module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      release: {
        files: {
          'www/lib/s3-image-uploader/dist/image-uploader.min.js': [
            'www/lib/s3-image-uploader/src/image-uploader.js'
          ]
        }
      },
      bundle: {
        files: {
          'www/lib/s3-image-uploader/dist/image-uploader.bundle.min.js': [
            'www/lib/aws-sdk/dist/aws-sdk.js',
            'www/lib/s3-image-uploader/src/image-uploader.js'
          ]
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.registerTask('build', ['uglify'])
  grunt.registerTask('default', ['build'])
}