class AddThumbnailSmallToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :thumbnail_small, :string
    add_column :projects, :thumbnail_medium, :string
  end
end
