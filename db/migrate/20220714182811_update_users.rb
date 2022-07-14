class UpdateUsers < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :password, :password_digest
    remove_column :users, :organization_id
  end
end
