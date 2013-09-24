class MemoirsController < ApplicationController
  def index
  end

  def show
    render json: Memoir.all.as_json
  end

  def create
    @memoir = Memoir.new(params[:memoir])
    if @memoir.save
      redirect_to "/admin/the-special-ones"
    end
  end

  def update
    @memoir = Memoir.find(params[:memoir_id])
    @memoir.attributes = params[:memoir]
    if @memoir.save
      redirect_to "/admin/the-special-ones"
    end
  end

  protected

  def memoirs
    @memoirs ||= Memoir.published.all
  end
  helper_method :memoirs
end
