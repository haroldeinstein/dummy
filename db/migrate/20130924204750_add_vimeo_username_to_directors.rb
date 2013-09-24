class AddVimeoUsernameToDirectors < ActiveRecord::Migration
  def change
    add_column :directors, :vimeo_username, :string
  end
end
