Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  root 'home#index'

  resources :categories do
    resources :topics do
      resources :posts 
    end
  end
end