class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.float :latitude
      t.float :longitude
      t.boolean :gmaps
      t.string :email
      t.string :name
      t.string :url

      t.timestamps
    end
  end
end
