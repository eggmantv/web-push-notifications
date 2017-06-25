class WebPushEndpointsController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    data = request.body.read
    subscription = JSON.parse(data)
    subscription.deep_symbolize_keys!
    # 如果你需要绑定用户
    # subscription.merge!(user: current_user) if logged_in?

    WebPushEndpoint.find_or_create! subscription
    render json: {status: 'ok'}
  end

end
