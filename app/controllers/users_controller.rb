class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      login(@user)
    else
      redirect_to "/admin/signup"
    end
  end
end
