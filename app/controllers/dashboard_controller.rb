class DashboardController < ApplicationController
  layout "dashboard"
  before_action :authenticate_user!

  def index
    # Dashboard home page
  end
end
