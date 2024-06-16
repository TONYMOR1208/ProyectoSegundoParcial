Rails.application.routes.draw do
  resources :libros, only: [:create, :index, :show, :update, :destroy]
  resources :autores, only: [:create, :index, :show, :update, :destroy]
  resources :generos, only: [:create, :index, :show, :update, :destroy]
end
