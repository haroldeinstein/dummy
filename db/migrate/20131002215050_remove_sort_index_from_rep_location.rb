class RemoveSortIndexFromRepLocation < ActiveRecord::Migration[5.1]
  def up
    remove_column :rep_locations, :sort_index
  end

  def down
    add_column :rep_locations, :sort_index, :string
  end
end
