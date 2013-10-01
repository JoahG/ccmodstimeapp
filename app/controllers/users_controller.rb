class UsersController < ApplicationController
  def index
  	@users = User.all
  	@json = User.all.to_gmaps4rails
  	@new_user ||= User.new
  end

  def create
  	@user = User.new(params[:user])
  	@user.save
  	redirect_to root_url
  end
end
