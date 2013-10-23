class ContactController < ApplicationController
  def index
    @rep_locations = RepLocation.order("sort_index ASC").all
    @address = Address.last || Address.new
    @headline = ContactLine.last || ContactLine.new
    @person = ContactPerson.last || ContactPerson.new
    @column_one = RepLocation.order("sort_index ASC").where(column: 1).all
    @column_two = RepLocation.order("sort_index ASC").where(column: 2).all
  end

  def show
    render json: RepLocation.all
  end

  def update_headline
    line = ContactLine.last || ContactLine.new
    line.update_attribute(:line, params['headline'])

    head :ok
  end

  def update_address
    address = Address.last || Address.new
    address.update_attributes(params[:address])

    render json: address.as_json
  end

  def update_person
    person = ContactPerson.last || ContactPerson.new
    person.update_attributes(params[:person])

    render json: person.as_json
  end

  def update
    (params[:rep_locations] || []).each do |k, rl|
      rep_location = RepLocation.find(rl["id"]) if rl["id"].present?
      if rl["delete"]
        rep_location.destroy
      else
        rep_location ||= RepLocation.new
        rep_location.location = rl["location"]
        rep_location.sort_index = rl["sort_index"] || rep_location.sort_index
        rep_location.column = rl["column"] || rep_location.column

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
