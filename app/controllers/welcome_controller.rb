class WelcomeController < ApplicationController
  def index
    @directors = Director.active.all
  end
end
