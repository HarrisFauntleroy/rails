# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'StaticPages', type: :request do
  describe 'GET /site_rules' do
    it 'returns http success' do
      get '/site_rules'
      expect(response).to have_http_status(:success)
    end
  end
end
