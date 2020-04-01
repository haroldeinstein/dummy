class AddSortIndexToRepLocationWithDefault < ActiveRecord::Migration[5.1]
  def change
    add_column :rep_locations, :sort_index, :integer, default: 0
  end
end
