class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.integer :director_id
      t.string :name
      t.string :video_url
      t.string :poster_image_url

      t.timestamps
    end
  end
end
