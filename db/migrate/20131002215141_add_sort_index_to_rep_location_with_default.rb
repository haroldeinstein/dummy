class AddSortIndexToRepLocationWithDefault < ActiveRecord::Migration
  def change
    add_column :rep_location, :sort_index, :integer, default: 0
  end
end
