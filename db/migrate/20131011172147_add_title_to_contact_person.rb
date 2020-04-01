class AddTitleToContactPerson < ActiveRecord::Migration[4.2]
  def change
    add_column :contact_people, :title, :string
  end
end
