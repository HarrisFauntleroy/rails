# frozen_string_literal: true

RSpec.shared_context 'with user', shared_context: :metadata do
  let(:user) { create(:user, id: 1) }
end
