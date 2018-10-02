Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  root "home#index"
  resources :matches, only: [:create]
  resources :dashboard, only: [:index]
  resources :rules, only: [:index]
  resources :collections, only: [:index, :show, :edit, :update]
  resources :cards, only: [:index]
  resources :ownerships, only: [:create, :destroy]
end
