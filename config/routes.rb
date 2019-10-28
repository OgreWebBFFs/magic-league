Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :users, only: [:index, :edit, :update, :show]
  root "home#index"
  resources :matches, only: [:index, :create]
  resources :dashboard, only: [:index]
  resources :rules, only: [:index]
  resources :trades, only: [:index, :create]
  resources :collections, only: [:index, :show, :edit, :update]
  resources :cards, only: [:index, :show]
  resources :ownerships, only: [:create, :destroy]
  resources :wishlists, only: [:index, :show, :update]
  resources :tradables, only: [:index, :show, :create, :destroy]
  resources :received_trades, only: [:create]

  namespace :admin do 
    authenticated :user, ->(u) { u.admin? } do
      resources :users do
        patch :lock
        patch :unlock
      end

      resources :matches
    end
  end
end
