class CreateReps < ActiveRecord::Migration
  def change
    create_table :reps do |t|
      t.integer :rep_location_id
      t.string :name

      t.timestamps
    end
  end
end
