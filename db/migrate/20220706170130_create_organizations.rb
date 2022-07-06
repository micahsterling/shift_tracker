class CreateOrganizations < ActiveRecord::Migration[6.1]
  def change
    create_table :organizations do |t|
      t.string :name
      t.float :hourly_rate
      t.string :slug

      t.timestamps
    end
  end
end
