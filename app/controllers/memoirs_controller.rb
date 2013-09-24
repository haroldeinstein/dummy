class MemoirsController < ApplicationController
  def index
  end

  def create
    puts params
    @memoir = Memoir.new(params[:memoir])
    if @memoir.save
      redirect_to "/admin/the-special-ones"
    end
  end

  protected

  def memoirs
    @memoirs || Memoir.published.all
  end
  helper_method :memoirs
end
