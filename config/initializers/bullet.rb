# frozen_string_literal: true

if defined?(Bullet)
  Bullet.enable = true
  Bullet.alert = false # JavaScript alert in the browser
  Bullet.bullet_logger = true # Log to Bullet log file (Rails.root/log/bullet.log)
  Bullet.console = true # Log to the browser console
  Bullet.rails_logger = true # Log to the Rails log
  Bullet.add_footer = true # Add information to the bottom of HTML response
  Bullet.skip_html_injection = false # Skip HTML comment injection (default is false)
  Bullet.raise = false # Raise errors (useful for test suite)

  # Add additional configurations if needed
  # Bullet.add_whitelist type: :n_plus_one_query, class_name: 'User', association: :profile
  Bullet.unused_eager_loading_enable = true
end
