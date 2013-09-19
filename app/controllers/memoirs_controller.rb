class MemoirsController < ApplicationController
  def index
  end

  def create
    @memoir = Memoir.new(params[:memoir])
    if @memoir.save
      redirect_to '/admin'
    else
      raise "children"
    end
  end
end
