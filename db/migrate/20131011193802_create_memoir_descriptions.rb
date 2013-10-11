class CreateMemoirDescriptions < ActiveRecord::Migration
  def change
    create_table :memoir_descriptions do |t|
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
