class AddWiredriveIdToNews < ActiveRecord::Migration
  def change
    add_column :news, :wiredrive_id, :bigint
  end
end
