class AddWiredriveIdToNews < ActiveRecord::Migration[5.1]
  def change
    add_column :news, :wiredrive_id, :bigint
  end
end
