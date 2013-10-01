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

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update_attributes(params[:user])
    redirect_to root_url
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to root_url
  end
end
