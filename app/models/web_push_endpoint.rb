class WebPushEndpoint < ApplicationRecord

  belongs_to :user, optional: true

  def self.find_or_create! options
    unless record = find_by(endpoint: options[:endpoint])
      record = create! user: options[:user],
        endpoint: options[:endpoint],
        subscription: options.except(:user).to_json
    end

    record
  end

end
