Dummy::Application.routes.draw do

  root to: 'welcome#index'

  # admin
  begin
    get  '/admin/login',            to: 'sessions#new',     as: 'login'
    get  '/admin/logout',           to: 'sessions#destroy', as: 'logout'
    get  '/admin/signup',           to: 'users#new',        as: 'signup'
    post '/admin',                  to: 'users#create'
    post '/sessions',               to: 'sessions#create'
    get  '/admin',                  to: 'admin#index'
    get  '/admin/hey',              to: 'admin#contact',    as: 'admin_contact'
    get  '/admin/the-special-ones', to: 'admin#memoir'
    post '/admin/the-special-ones', to: 'memoirs#create',   as: 'memoirs'
    put  '/admin/the-special-ones', to: 'memoirs#update'
    get  '/admin/news',             to: 'admin#news'
    get  '/admin/:director',        to: 'admin#director',   as: 'admin_director'
  end

  # api
  begin
    get  '/api/admin/projects',     to: 'projects#show'
    get  '/api/admin/reps',         to: 'contact#show'
    get  '/api/admin/memoirs',      to: 'memoirs#show'
    put  '/api/admin/projects',     to: 'projects#update'
    put  '/api/admin/reps',         to: 'contact#update'
    post '/api/admin/directors',    to: 'directors#create'
    get  '/api/admin/news',         to: 'news#show'
    get  '/api/admin/news-entries', to: 'news#news_entries'
    put  '/api/admin/news',         to: 'news#update'
  end

  begin
    get '/hey',              to: 'contact#index'
    get '/news',             to: 'news#index'
    get '/the-special-ones', to: 'memoirs#index'
  end

  get '/auth/vimeo', to: 'auths#create'
  get '/auth/vimeo/callback', to: 'auths#vimeo'

  get '/:director',        to: 'directors#index', as: 'director'
end
