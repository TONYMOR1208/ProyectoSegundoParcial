Rails.application.routes.draw do
  resources :usuarios, only: [:create, :index, :show, :update, :destroy]
  resources :libros, only: [:create, :index, :show, :update, :destroy] do
    collection do
      get 'buscar'
    end
  end
  resources :prestamos, only: [:create, :index, :show, :update, :destroy]
  resources :devoluciones, only: [:create, :index, :show, :update, :destroy]
  resources :editoriales, only: [:create, :index, :show, :update, :destroy]
  resources :generos, only: [:create, :index, :show, :update, :destroy]
end
