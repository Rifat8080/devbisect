module ApplicationHelper
  # Display flash messages
  def display_flash_message(type:, message:)
    case type
    when :notice
      tag.div(message, class: "alert alert-info")
    when :alert
      tag.div(message, class: "alert alert-error")
    when :success
      tag.div(message, class: "alert alert-success")
    when :warning
      tag.div(message, class: "alert alert-warning")
    else
      message
    end
  end

  # Format timestamp for display
  def format_datetime(datetime)
    datetime&.strftime("%B %d, %Y at %I:%M %p")
  end

  # Format date for display
  def format_date(date)
    date&.strftime("%B %d, %Y")
  end

  # Check if current page
  def active_link_to(name, path, options = {})
    options[:class] ||= ""
    options[:class] += " active" if current_page?(path)
    link_to(name, path, options)
  end

  # Truncate text with ellipsis
  def truncate_text(text, length = 50)
    truncate(text, length: length, omission: "...")
  end

  # Get user avatar (placeholder or gravatar)
  def user_avatar(user, size: 32)
    email_hash = Digest::MD5.hexdigest(user.email.downcase)
    image_tag("https://www.gravatar.com/avatar/#{email_hash}?s=#{size}&d=identicon", 
              alt: user.email, 
              class: "rounded-full w-#{size} h-#{size}")
  end
end
