class ChangeUserEmail < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :email_address, :email
  end
end
