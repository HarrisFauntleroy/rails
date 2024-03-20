FactoryBot.define do
  factory :post do
    content { Faker::Lorem.paragraph }
    association :topic
    association :user
  end
end
