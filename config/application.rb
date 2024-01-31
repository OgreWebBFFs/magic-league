require_relative "boot"
require_relative "../app/bot/ogre_bot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module MtgLeague
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Configuration for the application, engines, and railties goes here.
    #1
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.eager_load_paths << Rails.root.join("extras")
    config.time_zone = "Eastern Time (US & Canada)"
    config.add_autoload_paths_to_load_path = false # https://guides.rubyonrails.org/v7.0.4/upgrading_ruby_on_rails.html#config-add-autoload-paths-to-load-path
    config.eager_load_paths << "#{Rails.root}/spec/mailers/previews" # zeitwerk:check reported this path would not be eager loaded, so explicitly adding here 
    config.active_job.queue_adapter = :delayed_job

    config.before_configuration do
      env_file = File.join(Rails.root, 'config', 'local_env.yml')
      YAML.load(File.open(env_file)).each do |key, value|
        ENV[key.to_s] = value
      end if File.exists?(env_file)
    end
  end

  class OgreBotProcess < Rails::Railtie
    server do
      fork do
        OgreBot.instance.run
        at_exit { OgreBot.instance.stop }
      end
    end
  end

end
