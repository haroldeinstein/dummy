class AddSortIndexToRepLocation < ActiveRecord::Migration[4.2]
  def change
    add_column :rep_locations, :sort_index, :string
    add_index :rep_locations, :sort_index
  end
end
