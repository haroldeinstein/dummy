class AddColumnToRepManager < ActiveRecord::Migration[4.2]
  def change
    add_column :rep_locations, :column, :integer
  end
end
