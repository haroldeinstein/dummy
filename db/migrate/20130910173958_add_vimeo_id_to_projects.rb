class AddVimeoIdToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :vimeo_id, :integer
  end
end
