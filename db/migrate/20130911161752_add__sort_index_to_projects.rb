class AddSortIndexToProjects < ActiveRecord::Migration[4.2]
  def change
    add_column :projects, :sort_index, :integer, default: 0
  end
end
