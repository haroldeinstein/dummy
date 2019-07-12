class AddBioToDirector < ActiveRecord::Migration[4.2]
  def change
    add_column :directors, :bio, :text
  end
end
