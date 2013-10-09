class AddColumnToAuths < ActiveRecord::Migration
  def change
    add_column :auths, :verifier, :string
    rename_column :auths, :authorization_code, :token
  end
end
