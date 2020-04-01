class RenameNameToTitleOnProjects < ActiveRecord::Migration[4.2]
  def up
    rename_column :projects, :name, :title
  end

  def down
    rename_column :projects, :title, :name
  end
end
