class AddSortIndexToNews < ActiveRecord::Migration
  def change
    add_column :news, :sort_index, :integer, default: 0
  end
end
