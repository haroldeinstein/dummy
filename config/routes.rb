Dummy::Application.routes.draw do

  root to: 'welcome#index'

  begin
    get '/hey',              to: 'contact#index'
    get '/news',             to: 'news#index'
    get '/the-special-ones', to: 'memoir#index'
    get '/:director',        to: 'directors#index'
  end

end
