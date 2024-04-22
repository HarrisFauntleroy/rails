RSpec.shared_context 'with admin', shared_context: :metadata do
  let!(:admin_user) { create(:user, admin: true, id: 3) }
end
