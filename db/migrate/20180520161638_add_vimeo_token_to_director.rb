class AddVimeoTokenToDirector < ActiveRecord::Migration[5.1]
  def change
    add_column :directors, :vimeo_token, :string
  end
end
