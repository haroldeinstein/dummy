Dummy::Application.routes.draw do

  root to: 'welcome#index'

  # admin
  begin
    get  '/admin/login',            to: 'sessions#new',     as: 'login'
    get  '/admin/logout',           to: 'sessions#destroy', as: 'logout'
    post '/sessions',               to: 'sessions#create'
    #
    get  '/admin/signup',           to: 'users#new',        as: 'signup'
    post '/admin',                  to: 'users#create'
    #
    post '/admin/the-special-ones', to: 'memoirs#create',   as: 'memoirs'
    put  '/admin/the-special-ones', to: 'memoirs#update'
    #
    get  '/admin',                  to: 'admin#index'
    get  '/admin/hey',              to: 'admin#contact',    as: 'admin_contact'
    get  '/admin/the-special-ones', to: 'admin#memoir'
    get  '/admin/news',             to: 'admin#news'
    get  '/admin/:director',        to: 'admin#director',   as: 'admin_director'
  end

  # api
  begin
    put    '/api/admin/description', to: 'memoirs#update_description'
    get    '/api/admin/memoirs',     to: 'memoirs#show'
    delete '/api/admin/memoirs',     to: 'memoirs#destroy'
    #
    post '/api/admin/directors',    to: 'directors#create'
    #
    get  '/api/admin/projects',     to: 'projects#show'
    put  '/api/admin/projects',     to: 'projects#update'
    get  '/api/admin/vimeo',        to: 'projects#vimeo'
    #
    get  '/api/admin/reps',         to: 'contact#show'
    put  '/api/admin/reps',         to: 'contact#update'
    put  '/api/admin/headline',     to: 'contact#update_headline'
    put  '/api/admin/address',      to: 'contact#update_address'
    put  '/api/admin/person',       to: 'contact#update_person'
    #
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
