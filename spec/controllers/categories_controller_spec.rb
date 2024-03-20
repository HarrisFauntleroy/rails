RSpec.describe CategoriesController, type: :controller do
  let(:user) { FactoryBot.create(:user) }
  let(:category) { FactoryBot.create(:category) }

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to be_successful
    end

    it "assigns all categories to @categories" do
      get :index
      expect(assigns(:categories)).to eq(Category.all)
    end

    it "assigns the current user to @current_user" do
      get :index
      expect(assigns(:current_user)).to eq(user)
    end
  end
end
