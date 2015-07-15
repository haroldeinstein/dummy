class AddBioToDirector < ActiveRecord::Migration
  def change
    add_column :directors, :bio, :text
  end
end
