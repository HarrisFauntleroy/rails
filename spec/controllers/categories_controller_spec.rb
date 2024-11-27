# frozen_string_literal: true

require 'rails_helper'

describe CategoriesController, type: :controller do
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
  end

  describe 'GET #new' do
    context 'when no user is signed in' do
      before { get :new }

      it 'redirects to the root path' do
        expect(response).to redirect_to(root_path)
      end
    end

    context 'when regular user is signed in' do
      before do
        sign_in user
        get :new
      end

      it 'redirects to the root path' do
        expect(response).to redirect_to(root_path)
      end
    end

    context 'when moderator user is signed in' do
      before do
        sign_in moderator_user
        get :new
      end

      it 'assigns a new category to @category' do
        expect(assigns(:category)).to be_a_new(Category)
      end

      it 'assigns the category to the current user' do
        expect(assigns(:category).user).to eq(moderator_user)
      end

      it 'renders the new template' do
        expect(response).to render_template(:new)
      end
    end

    context 'when admin user is signed in' do
      before do
        sign_in admin_user
        get :new
      end

      it 'assigns a new category to @category' do
        expect(assigns(:category)).to be_a_new(Category)
      end

      it 'assigns the category to the current user' do
        expect(assigns(:category).user).to eq(admin_user)
      end

      it 'renders the new template' do
        expect(response).to render_template(:new)
      end
    end
  end

  describe 'POST #create' do
    let(:category_params) { { name: 'New Category' } }

    context 'when no user is signed in' do
      it 'redirects to the login page' do
        post :create, params: { category: category_params }
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when regular user is signed in' do
      before { sign_in user }

      it 'does not allow category creation' do
        expect do
          post :create, params: { category: category_params }
        end.not_to change(Category, :count)
        expect(response).to redirect_to(root_path)
      end
    end

    context 'when admin user is signed in' do
      before { sign_in admin_user }

      it 'creates a new category' do
        expect do
          post :create, params: { category: category_params }
        end.to change(Category, :count).by(1)
        expect(response).to redirect_to(forums_path)
      end

      context 'with invalid parameters' do
        it 'does not create a new category' do
          expect do
            post :create, params: { category: { name: '' } }
          end.not_to change(Category, :count)
          expect(response).to render_template(:new)
        end
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:category) { create(:category, user: admin_user) }

    context 'when no user is signed in' do
      it 'redirects to the login page' do
        delete :destroy, params: { id: category.id }
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when regular user is signed in' do
      before { sign_in user }

      it 'does not allow deleting a category' do
        delete :destroy, params: { id: category.id }
        expect(response).to redirect_to(root_path)
      end
    end

    context 'when admin user is signed in' do
      before { sign_in admin_user }

      it 'deletes the category' do
        category
        expect do
          delete :destroy, params: { id: category.id }
        end.to change(Category, :count).by(-1)
        expect(response).to redirect_to(forums_path)
      end

      context 'with non-existing category' do
        it 'handles non-existing category gracefully' do
          delete :destroy, params: { id: 99_999 }
          expect(response).to redirect_to(errors_not_found_path)
          expect(flash[:alert]).to eq(I18n.t('record_not_found'))
        end
      end
    end
  end

  describe 'before actions' do
    describe '#set_category' do
      let!(:category) { create(:category, user: admin_user) }

      context 'when category exists' do
        it 'sets @category' do
          get :show, params: { id: category.id }
          expect(assigns(:category)).to eq(category)
        end
      end

      context 'when category does not exist' do
        it 'redirects to the not found page' do
          get :show, params: { id: 99_999 }
          expect(response).to redirect_to(errors_not_found_path)
          expect(flash[:alert]).to eq(I18n.t('record_not_found'))
        end
      end
    end
  end

  describe 'category_params' do
    before do
      sign_in admin_user
      allow(controller).to receive(:params).and_return(params)
    end

    let(:params) { ActionController::Parameters.new(category: { name: 'Category Name', user: admin_user }) }

    it 'permits the name attribute' do
      expect(controller.send(:category_params)).to eq(params[:category].permit(:name))
    end

    it 'does not permit other attributes' do
      expect(controller.send(:category_params)).not_to include(:user_id)
    end
  end

  describe 'user_not_authorized' do
    it 'redirects to the root path' do
      get :new
      expect(response).to redirect_to(root_path)
      expect(flash[:alert]).to eq(I18n.t('you_are_not_authorized_to_perform_this_action'))
    end
  end
end
