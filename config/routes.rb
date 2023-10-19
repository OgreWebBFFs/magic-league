Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  root "home#index"

  get 'users/auth/discord', to: 'users/discord_account#index'

  resources :users, only: [:edit, :update, :show]
  resources :matches, only: [:index, :create]
  resources :dashboard, only: [:index]
  resources :rules, only: [:index]
  resources :browse, only: [:index]
  resources :trade_mail, only: [:index, :create]
  resources :trades, only: [:index, :create, :update, :destroy]

  resources :draffles, only: [:index, :show, :create, :update, :destroy]
  put 'draffles/:id/start', to: 'draffles#start', as: 'start_draffle'
  put 'draffles/:id/pause', to: 'draffles#pause', as: 'pause_draffle'
  put 'draffles/:id/complete', to: 'draffles#complete', as: 'complete_draffle'
  put 'draffles/:id/pick', to: 'draffles#pick', as: 'pick_draffle'
  put 'draffles/:id/reset', to: 'draffles#reset', as: 'reset_draffle'

  resources :collections, only: [:index, :show, :edit, :update]
  get 'collections/:id/bulk_edit', to: 'collections#bulk_edit', as: 'bulk_edit_collection'
  patch 'collections/:id/bulk_update', to: 'collections#bulk_update', as: 'bulk_update_collection'

  resources :cards, only: [:index, :show] do
    member do
      get 'prints'
    end
  end
  resources :ownerships, only: [:create, :destroy]
  resources :wishlists, only: [:index, :show, :update]
  resources :tradables, only: [:index, :show, :create, :destroy]
  resources :received_trades, only: [:create]

  resources :user_objectives, only: [:create] do
    member do
      patch 'reroll'
      put 'complete'
    end
  end

  resources :rerolls, only: [:create] do
    collection do
      patch 'update_all'
    end
  end

  namespace :admin do 
    authenticated :user, ->(u) { u.admin? } do
      resources :users do
        patch :lock
        patch :unlock
      end

      resources :matches, only: [:index, :destroy]
      resources :objectives, only: [:create, :index, :update, :destroy]

      resources :settings do
        get :edit
        patch :update
      end
    end
  end
end
