module DeviseHelper
  # These methods are used in application.html.erb in the login/signup form on the sidebar 👇

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def resource_class
    User
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

  # These methods are used in application.html.erb in the login/signup form on the sidebar ☝️
end
