class CreateMemoirDescriptions < ActiveRecord::Migration[4.2]
  def change
    create_table :memoir_descriptions do |t|
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
