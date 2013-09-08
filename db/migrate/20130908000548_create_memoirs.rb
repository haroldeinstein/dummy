class CreateMemoirs < ActiveRecord::Migration
  def change
    create_table :memoirs do |t|
      t.text :caption
      t.string :image_url

      t.timestamps
    end
  end
end
