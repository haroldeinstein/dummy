class RenameNameToTitleOnProjects < ActiveRecord::Migration
  def up
    rename_column :projects, :name, :title
  end

  def down
    rename_column :projects, :title, :name
  end
end
