# frozen_string_literal: true

require 'rails_helper'

describe UsersController, type: :controller do
  describe 'GET #index' do
    it 'assigns all users to @users' do
      admin_user = create(:user, admin: true)
      sign_in admin_user

      users = create_list(:user, 3)
      get :index

      expect(assigns(:users)).to eq([ admin_user, *users ])
    end

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

  describe 'GET #show' do
    let(:user) { create(:user, id: 1) }

    it 'assigns the requested user to @user' do
      sign_in user
      get :show, params: { id: user.id }
      expect(assigns(:user)).to eq(user)
    end

    it 'handles a user with no comments' do
      user = create(:user)
      sign_in user
      get :show, params: { id: user.id }
      expect(assigns(:recent_topics_opened)).to eq([])
      expect(assigns(:recent_comments)).to eq([])
    end

    it 'assigns recent topics opened by the user to @recent_topics_opened' do
      sign_in user
      topics = create_list(:topic, 5, user:)
      get :show, params: { id: user.id }
      expect(assigns(:recent_topics_opened)).to eq(topics.reverse)
    end

    it 'assigns recent comments by the user to @recent_comments' do
      sign_in user
      comments = create_list(:comment, 5, user:)
      get :show, params: { id: user.id }
      expect(assigns(:recent_comments)).to eq(comments.reverse)
    end

    it 'limits recent comments and topics to 5' do
      sign_in user
      create_list(:topic, 6, user:)
      create_list(:comment, 6, user:)

      get :show, params: { id: user.id }

      expect(assigns(:recent_comments).size).to eq(5)
      expect(assigns(:recent_topics_opened).size).to eq(5)
    end

    it 'renders the show template' do
      sign_in user
      get :show, params: { id: user.id }
      expect(response).to render_template(:show)
    end

    it 'redirects to the sign in page when a user is not signed in' do
      get :show, params: { id: user.id }
      expect(response).to redirect_to(new_user_session_path)
    end

    it 'redirects to the not found page when a user is not found' do
      sign_in user
      get :show, params: { id: 1000 }
      expect(response).to redirect_to(errors_not_found_path)
    end
  end
end
