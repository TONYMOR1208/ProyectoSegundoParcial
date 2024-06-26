Rails.application.routes.draw do
  post 'auth/login', to: 'authentication#login'
  post 'auth/register', to: 'authentication#register'
  resources :libros, only: [:create, :index, :show, :update, :destroy]
  resources :autores, only: [:create, :index, :show, :update, :destroy]
  resources :generos, only: [:create, :index, :show, :update, :destroy]
end
