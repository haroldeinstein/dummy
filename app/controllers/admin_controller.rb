class AdminController < ApplicationController
  before_filter :login_required

  def index
    @directors = Director.all
  end

  def directors
  end
end
