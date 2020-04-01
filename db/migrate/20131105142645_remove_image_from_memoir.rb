class RemoveImageFromMemoir < ActiveRecord::Migration[4.2]
  def up
    remove_column :memoirs, :image
  end

  def down
    add_column :memoirs, :image, :string
  end
end
