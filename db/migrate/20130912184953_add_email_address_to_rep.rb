class AddEmailAddressToRep < ActiveRecord::Migration
  def change
    add_column :reps, :email_address, :string
  end
end
