class AddEmailAddressToRep < ActiveRecord::Migration[4.2]
  def change
    add_column :reps, :email_address, :string
  end
end
