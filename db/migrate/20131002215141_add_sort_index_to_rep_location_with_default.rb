class AddSortIndexToRepLocationWithDefault < ActiveRecord::Migration
  def change
    add_column :rep_locations, :sort_index, :integer, default: 0
  end
end
