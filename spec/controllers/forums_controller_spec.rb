# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ForumsController, type: :controller do
  let(:user) { create(:user) }
  let(:moderator_user) { create(:user, moderator: true) }
  let(:admin_user) { create(:user, admin: true, id: 1) }

  describe 'GET #index' do
    let(:categories) { create_list(:category, 5, user: admin_user) }

    before do
      get :index
    end

    it 'assigns all categories to @categories' do
      expect(assigns(:categories)).to eq(categories)
    end

    it 'renders the index template' do
      expect(response).to render_template(:index)
    end

    it 'returns a 200 status code' do
      expect(response).to have_http_status(200)
    end
  end
end
