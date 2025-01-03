# frozen_string_literal: true

require 'rails_helper'

describe 'Users', type: :request do
  describe 'GET /users/sign_in' do
    it 'renders a successful response' do
      get new_user_session_path
      expect(response).to have_http_status(:ok)
      # expect(response.body).to include('Sign in')
    end
  end

  describe 'GET /users/sign_up' do
    it 'renders a successful response' do
      get new_user_registration_path
      expect(response).to have_http_status(:ok)
      # expect(response.body).to include('Sign up')
    end
  end
end
