class ContactController < ApplicationController
  def index
    @rep_locations = RepLocation.order("sort_index ASC").all
  end

  def show
    render json: RepLocation.all
  end

  def update
    (params[:rep_locations] || []).each do |k, rl|
      rep_location = RepLocation.find(rl["id"]) if rl["id"].present?
      rep_location ||= RepLocation.new
      if rl["delete"]
        rep_location.destroy
      else
        rep_location.location = rl["location"]
        rep_location.sort_index = rl["sort_index"] || rep_location.sort_index

        (rl["reps"] || []).each do |k, r|
          rep = Rep.find(r["id"]) if r["id"].present?
          rep ||= Rep.new
          rep.attributes = r

          rep_location.reps << rep
        end

        rep_location.save
      end
    end

    head :ok
  end
end
