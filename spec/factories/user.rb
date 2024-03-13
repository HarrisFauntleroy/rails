FactoryBot.define :user do
  sequence(:email) { |n| "user#{n}@example.com" }
  password { "password123" }
  first_name { "John" }
  last_name { "Doe" }
end
