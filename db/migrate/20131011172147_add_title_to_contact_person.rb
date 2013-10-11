class AddTitleToContactPerson < ActiveRecord::Migration
  def change
    add_column :contact_people, :title, :string
  end
end
