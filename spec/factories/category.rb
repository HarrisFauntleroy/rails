FactoryBot.define do
  factory :category do
    name { Faker::Lorem.word }
    association :user
  end
end
