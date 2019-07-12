class RenameWiredriveIdOnNews < ActiveRecord::Migration[4.2]
  def up
    rename_column :news, :wiredrive_id, :vimeo_id
  end

  def down
    rename_column :news, :vimeo_id, :wiredrive_id
  end
end
