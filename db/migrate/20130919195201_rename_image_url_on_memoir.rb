class RenameImageUrlOnMemoir < ActiveRecord::Migration[5.1]
  def up
    rename_column :memoirs, :image_url, :image
  end

  def down
    rename_column :memoirs, :image, :image_url
  end
end
