FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'password123' }
    admin { false }
  end
end
