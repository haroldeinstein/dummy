class MemoirsController < ApplicationController
  def index
    @description = MemoirDescription.last || MemoirDescription.new
  end

  def show
    render json: Memoir.all.map{|m| m.as_json}
  end

  def update_description
    description = MemoirDescription.last || MemoirDescription.new
    description.title = params[:description][:title]
    description.description = params[:description][:description]
    description.save

    render json: description.as_json
  end

  def create
    @memoir = Memoir.new(memoir_params)
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

  def destroy
    @memoir = Memoir.find(params[:memoir_id])
    @memoir.destroy
    redirect_to "/admin/the-special-ones"
  end

  protected

  def memoir_params
    params.require(:memoir).permit(:caption, :image => [:tempfile, :original_filename, :content_type, :headers])
  end

  def memoirs
    @memoirs ||= Memoir.published.order('id ASC').all
  end
  helper_method :memoirs
end
