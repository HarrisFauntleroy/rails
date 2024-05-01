Recaptcha.configure do |config|
  config.site_key   = Rails.application.credentials.recaptchalocal[:site_key]
  config.secret_key = Rails.application.credentials.recaptchalocal[:secret_key]
  # config.site_key   = ENV['RECAPTCHA_SITE_KEY']
  # config.secret_key = ENV['RECAPTCHA_SECRET_KEY']
end