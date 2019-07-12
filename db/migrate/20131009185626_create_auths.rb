class CreateAuths < ActiveRecord::Migration[4.2]
  def change
    create_table :auths do |t|
      t.string :provider
      t.string :uid
      t.string :authorization_code
      t.integer :user_id

      t.timestamps
    end

    add_index :auths, :user_id
  end
end
