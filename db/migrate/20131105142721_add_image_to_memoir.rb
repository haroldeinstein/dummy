class AddImageToMemoir < ActiveRecord::Migration
  def change
    add_attachment :memoirs, :image
  end
end
