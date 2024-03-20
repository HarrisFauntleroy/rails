FactoryBot.define do
  factory :topic do
    title { Faker::Lorem.sentence(word_count: 2) }
    content { Faker::Lorem.paragraph }
    association :category
    association :user
  end
end
