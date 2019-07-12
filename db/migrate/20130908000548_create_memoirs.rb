class CreateMemoirs < ActiveRecord::Migration[4.2]
  def change
    create_table :memoirs do |t|
      t.text :caption
      t.string :image_url

      t.timestamps
    end
  end
end
