Timeapp::Application.routes.draw do
	get 'admin' => 'users#admin', :as => "admin"
	root :to => 'users#index'
	resources :users
end
