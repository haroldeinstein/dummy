class AddColumnToAuths < ActiveRecord::Migration[4.2]
  def change
    add_column :auths, :verifier, :string
    rename_column :auths, :authorization_code, :token
  end
end
