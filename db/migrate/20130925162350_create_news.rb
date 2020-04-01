class CreateNews < ActiveRecord::Migration[5.1]
  def change
    create_table :news do |t|
      t.string :title
      t.string :video_url
      t.string :thumbnail_large
      t.string :thumbnail_medium
      t.string :thumbnail_small
      t.integer :sort_index

      t.timestamps
    end
  end
end
