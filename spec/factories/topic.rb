# frozen_string_literal: true

FactoryBot.define do
  factory :topic do
    title { Faker::Lorem.sentence(word_count: 2) }
    content { Faker::Lorem.paragraph }
    association :forum
    association :user
  end
end
