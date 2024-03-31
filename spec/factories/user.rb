FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    username { Faker::Internet.username}
    password { 'Password!1' }
    admin { false }
  end
end
