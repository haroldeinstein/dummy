class RenamePosterImageUrlOnProjects < ActiveRecord::Migration[4.2]
  def up
    rename_column :projects, :poster_image_url, :thumbnail_large
  end

  def down
    rename_column :projects, :thumbnail_large, :poster_image_url
  end
end
