# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  root 'home#index'

  get 'site_rules', to: 'static_pages#site_rules'
  get 'errors/not_found', to: 'errors#not_found'

  resources :users, only: %i[show index]

  resources :category_groups do
    resources :forums
  end

  resources :forums do
    resources :topics
  end

  resources :topics do
    resources :comments
  end
end
