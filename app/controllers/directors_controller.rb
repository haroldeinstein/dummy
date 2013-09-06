class DirectorsController < ApplicationController
  def index
    @director = Director.find_by_url!(params[:director])
  end
end
