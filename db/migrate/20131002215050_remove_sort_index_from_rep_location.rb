class RemoveSortIndexFromRepLocation < ActiveRecord::Migration
  def up
    remove_column :rep_locations, :sort_index
  end

  def down
    add_column :rep_locations, :sort_index, :string
  end
end
