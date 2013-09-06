Dummy::Application.routes.draw do
  root to: 'welcome#index'

  begin
    get 'hey', to: 'contact#index'
  end
end
