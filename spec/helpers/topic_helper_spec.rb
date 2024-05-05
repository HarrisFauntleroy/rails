# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TopicHelper, type: :helper do
  let(:user) { create(:user, id: 1) }
  let(:category) { create(:category, user:) }
  let(:forum) { create(:forum, category:, user:) }
  let(:topic) { create(:topic, user:, forum:) }
end
