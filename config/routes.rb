# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  root 'home#index'

  get 'site_rules', to: 'static_pages#site_rules'
  get 'static_pages/site_rules'

  resources :users, only: %i[show index] # Only need the 'show' route for profiles

  resources :categories do
    resources :topics do
      resources :posts
    end
  end

  get 'errors/not_found', to: 'errors#not_found'
end
