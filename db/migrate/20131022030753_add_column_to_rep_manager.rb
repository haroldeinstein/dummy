class AddColumnToRepManager < ActiveRecord::Migration
  def change
    add_column :rep_locations, :column, :integer
  end
end
