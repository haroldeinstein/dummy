class MemoirsController < ApplicationController
  def index
  end

  def create
    puts params
    @memoir = Memoir.new(params[:memoir])
    if @memoir.save
      redirect_to "/admin/the-special-ones?unsaved"
    end
  end
end
