class CreateReps < ActiveRecord::Migration[4.2]
  def change
    create_table :reps do |t|
      t.integer :rep_location_id
      t.string :name

      t.timestamps
    end
  end
end
