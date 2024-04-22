# lib/tasks/spec_check.rake
require 'rainbow'

namespace :spec_check do
  desc 'Verify that each model has a corresponding spec file'
  task models: :environment do
    Dir['app/models/**/*.rb'].each do |model_path|
      spec_path = model_path.sub(/app/, 'spec').sub(/\.rb$/, '_spec.rb')
      puts Rainbow("Missing spec for model: #{model_path}").red unless File.exist?(spec_path)
    end
  end

  desc 'Verify that each controller has a corresponding spec file'
  task controllers: :environment do
    Dir['app/controllers/**/*.rb'].each do |controller_path|
      spec_path = controller_path.sub(/app/, 'spec').sub(/\.rb$/, '_spec.rb')
      puts Rainbow("Missing spec for controller: #{controller_path}").blue unless File.exist?(spec_path)
    end
  end

  desc 'Verify that each view has a corresponding spec file'
  task views: :environment do
    Dir['app/views/**/*.erb'].each do |view_path|
      spec_path = view_path.sub(/app/, 'spec').sub(/\.erb$/, '_spec.rb')
      puts Rainbow("Missing spec for view: #{view_path}").magenta unless File.exist?(spec_path)
    end
  end

  desc 'Verify that each model, controller, and view has a corresponding spec file'
  task all: :environment do
    check_types = {
      'Model' => { path: 'app/models/**/*.rb', replace: '.rb', with: '_spec.rb' },
      'Controller' => { path: 'app/controllers/**/*.rb', replace: '.rb', with: '_spec.rb' },
      'View' => { path: 'app/views/**/*.*', replace: '.*', with: '_spec.rb' }
    }

    missing_specs = []

    check_types.each do |type, config|
      Dir[config[:path]].each do |file_path|
        spec_path = file_path.sub(/app/, 'spec').sub(/#{config[:replace]}$/, config[:with])
        missing_specs << "#{type} spec missing for: #{file_path}" unless File.exist?(spec_path)
      end
    end

    if missing_specs.any?
      puts Rainbow('Missing Specs Report:').bg(:yellow).black
      missing_specs.each { |msg| puts Rainbow(msg).red }
    else
      puts Rainbow('All files have corresponding specs!').green
    end
  end
end
