Dummy::Application.routes.draw do

  root to: 'welcome#index'

  # admin
  begin
    get      '/admin/login',     to: 'sessions#new',     as: 'login'
    get      '/admin/logout',    to: 'sessions#destroy', as: 'logout'
    get      '/admin/signup',    to: 'users#new',        as: 'signup'
    post     '/admin',           to: 'users#create'
    post     '/sessions',        to: 'sessions#create'
    get      '/admin',           to: 'admin#index'
    get      '/admin/:director', to: 'admin#director',   as: 'admin_director'
  end

  # api
  begin
    get    '/api/admin/projects',      to: 'projects#show'
    post   '/api/admin/projects/sort', to: 'projects#sort'
    post   '/api/admin/projects',      to: 'projects#create'
    put    '/api/admin/projects',      to: 'projects#update'
    delete '/api/admin/projects',      to: 'projects#destroy'
  end

  begin
    get '/hey',              to: 'contact#index'
    get '/news',             to: 'news#index'
    get '/the-special-ones', to: 'memoir#index'
    get '/:director',        to: 'directors#index', as: 'director'
  end

end
