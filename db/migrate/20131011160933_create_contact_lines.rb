class CreateContactLines < ActiveRecord::Migration[4.2]
  def change
    create_table :contact_lines do |t|
      t.string :line

      t.timestamps
    end
  end
end
