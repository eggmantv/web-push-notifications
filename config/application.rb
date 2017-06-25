require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

WEB_PUSH_PUBLIC_KEY = 'BOlN-gCdCk7NxYEQAV6xELMj0F1RrVBB0dx3PwXTdwkmnzjvZr2BS03W6p7Oq7b5I3e0i8ybNPEdYA4pBjJwqE8='
WEB_PUSH_PRIVATE_KEY = 'TQO4dfgILSsFuNZ3oH55O2Wk5dYPQzAIPdbz-h8NlLs='

module WebPushSample
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Don't generate system test files.
    config.generators.system_tests = nil
  end
end
