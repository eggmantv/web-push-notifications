Rails.application.routes.draw do
  root 'welcome#index'
  resources :web_push_endpoints, only: [:create]
end
