class AddImageToMemoir < ActiveRecord::Migration[4.2]
  def change
    add_attachment :memoirs, :image
  end
end
