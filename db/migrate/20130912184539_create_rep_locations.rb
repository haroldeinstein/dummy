class CreateRepLocations < ActiveRecord::Migration
  def change
    create_table :rep_locations do |t|
      t.string :location

      t.timestamps
    end
  end
end
