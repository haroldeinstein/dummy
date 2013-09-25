class RemoveSortIndexFromNews < ActiveRecord::Migration
  def up
    remove_column :news, :sort_index
  end

  def down
    add_column :news, :sort_index, :integer
  end
end
