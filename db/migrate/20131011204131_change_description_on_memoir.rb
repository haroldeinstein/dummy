class ChangeDescriptionOnMemoir < ActiveRecord::Migration
  def up
    change_column :memoir_descriptions, :description, :text
  end

  def down
    change_column :memoir_descriptions, :description, :string
  end
end
