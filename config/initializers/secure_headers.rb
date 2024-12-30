SecureHeaders::Configuration.default do |config|
  config.x_frame_options = "DENY"
  config.x_content_type_options = "nosniff"
  config.x_xss_protection = "1; mode=block"
  config.x_download_options = "noopen"
  config.x_permitted_cross_domain_policies = "none"
  config.referrer_policy = %w[strict-origin-when-cross-origin]

  config.csp = {
    default_src: %w['none'],
    script_src: %w['self'],
    connect_src: %w['self'],
    img_src: %w['self'],
    style_src: %w['self'],
    font_src: %w['self'],
    form_action: %w['self'],
    base_uri: %w['self']
  }
end
