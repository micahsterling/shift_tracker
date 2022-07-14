Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :organizations, param: :slug
      resources :shifts

      
      post "/users" => "users#create"
      post "/sessions" => "sessions#create"
    end
  end

  get '*path', to: "pages#index", via: :all
end
