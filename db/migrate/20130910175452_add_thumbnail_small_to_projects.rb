class AddThumbnailSmallToProjects < ActiveRecord::Migration[4.2]
  def change
    add_column :projects, :thumbnail_small, :string
    add_column :projects, :thumbnail_medium, :string
  end
end
