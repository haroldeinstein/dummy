class ContactController < ApplicationController
  def index
  end

  def show
    render json: RepLocation.all
  end

  def update

  end
end
