class CreateContactPeople < ActiveRecord::Migration[4.2]
  def change
    create_table :contact_people do |t|
      t.string :name
      t.string :email

      t.timestamps
    end
  end
end
