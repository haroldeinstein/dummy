class RemoveSortIndexFromNews < ActiveRecord::Migration[5.1]
  def up
    remove_column :news, :sort_index
  end

  def down
    add_column :news, :sort_index, :integer
  end
end
