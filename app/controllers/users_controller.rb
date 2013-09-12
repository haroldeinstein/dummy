class UsersController < ApplicationController
  def new
    @editable = "false"
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
