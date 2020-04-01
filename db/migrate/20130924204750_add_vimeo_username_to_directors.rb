class AddVimeoUsernameToDirectors < ActiveRecord::Migration[5.1]
  def change
    add_column :directors, :vimeo_username, :string
  end
end
