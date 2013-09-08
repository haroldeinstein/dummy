class WelcomeController < ApplicationController
  def index
    @directors = Director.all
  end
end
