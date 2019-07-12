class AddSortIndexToNews < ActiveRecord::Migration[5.1]
  def change
    add_column :news, :sort_index, :integer, default: 0
  end
end
