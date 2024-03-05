Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  resources :categories do
    resources :topics
  end
  resources :topics do
    resources :posts
  end
  root 'homepage#index'
end