# frozen_string_literal: true

RSpec.shared_context 'with moderator', shared_context: :metadata do
  let!(:moderator_user) { create(:user, moderator: true, id: 2) }
end
