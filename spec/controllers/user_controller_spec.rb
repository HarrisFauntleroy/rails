# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET #show' do
    let(:user) { create(:user, id: 1) }

    it 'assigns the requested user to @user' do
      sign_in user
      get :show, params: { id: user.id }
      expect(assigns(:user)).to eq(user)
    end

    it 'assigns recent topics opened by the user to @recent_topics_opened' do
      sign_in user
      topics = create_list(:topic, 5, user: user)
      get :show, params: { id: user.id }
      expect(assigns(:recent_topics_opened)).to eq(topics.reverse)
    end

    it 'assigns recent posts by the user to @recent_posts' do
      sign_in user
      posts = create_list(:post, 5, user: user)
      get :show, params: { id: user.id }
      expect(assigns(:recent_posts)).to eq(posts.reverse)
    end

    it 'assigns the total number of posts by the user to @total_posts' do
      sign_in user
      create_list(:post, 3, user: user)
      get :show, params: { id: user.id }
      expect(assigns(:total_posts)).to eq(3)
    end

    it 'renders the show template' do
      sign_in user
      get :show, params: { id: user.id }
      expect(response).to render_template(:show)
    end

    it 'redirects to the not found page when a user is not found' do
      sign_in user
      get :show, params: { id: 1000 }
      expect(response).to redirect_to(errors_not_found_path)
    end
  end

  describe 'GET #index' do
    it 'renders the index template for admin users' do
      admin_user = create(:user, admin: true)
      sign_in admin_user

      get :index

      expect(response).to render_template(:index)
    end

    it 'redirects non-admin users' do
      non_admin_user = create(:user, admin: false)
      sign_in non_admin_user

      get :index

      expect(response).to redirect_to(root_path)
    end
  end

  shared_context 'unauthorized access' do |action, params|
    it 'raises an error' do
      expect do
        case action
        when :get
          get action, params: params
        when :post
          post action, params: params
        when :patch
          patch action, params: params
        when :delete
          delete action, params: params
        end
      end.to raise_error(ActionController::UrlGenerationError)
    end
  end

  describe 'POST #create' do
    include_context 'unauthorized access', :post, {}
  end

  describe 'GET #edit' do
    include_context 'unauthorized access', :get, { id: 1 }
  end

  describe 'PATCH #update' do
    include_context 'unauthorized access', :patch, { id: 1 }
  end

  describe 'DELETE #destroy' do
    include_context 'unauthorized access', :delete, { id: 1 }
  end
end
