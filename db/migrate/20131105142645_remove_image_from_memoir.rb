class RemoveImageFromMemoir < ActiveRecord::Migration
  def up
    remove_column :memoirs, :image
  end

  def down
    add_column :memoirs, :image, :string
  end
end
