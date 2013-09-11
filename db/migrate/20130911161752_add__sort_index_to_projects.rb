class AddSortIndexToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :sort_index, :integer, default: 0
  end
end
