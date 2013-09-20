class MemoirsController < ApplicationController
  def index
  end

  def create
    @memoir = Memoir.new(params[:memoir])
    if @memoir.save
      render :json => @memoir.as_json
    end
  end
end
