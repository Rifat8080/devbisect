class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Security headers
  before_action :set_security_headers
  before_action :authenticate_user!, unless: :devise_controller?

  # Make current_user available in views
  helper_method :current_user

  protected

  def set_security_headers
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
  end

  def authenticate_user!
    redirect_to new_user_session_path, alert: "Please sign in first" unless user_signed_in?
  end
end
