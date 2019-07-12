class CreateRepLocations < ActiveRecord::Migration[4.2]
  def change
    create_table :rep_locations do |t|
      t.string :location

      t.timestamps
    end
  end
end
