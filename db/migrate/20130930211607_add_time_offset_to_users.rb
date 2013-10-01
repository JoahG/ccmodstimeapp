class AddTimeOffsetToUsers < ActiveRecord::Migration
  def change
    add_column :users, :time_offset, :string
  end
end
