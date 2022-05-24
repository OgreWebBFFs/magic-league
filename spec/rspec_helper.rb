APP_PATH = File.expand_path('../app', __dir__)

# load all service objects
Dir["#{APP_PATH}/service_objects/*.rb"].each {|file| require file }
