class WelcomeController < ApplicationController
  def index
    @directors = Director.active.all.order(created_at: :asc)
  end
end
