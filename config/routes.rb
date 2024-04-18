# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  root 'home#index'

  get 'site_rules', to: 'static_pages#site_rules'

  resources :users, only: %i[show index]

  resources :category_groups do
    resources :categories
  end

  resources :categories do
    resources :topics
  end

  resources :topics do
    resources :posts
  end
end
