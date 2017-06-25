class CreateWebPushEndpoints < ActiveRecord::Migration[5.1]
  def change
    create_table :web_push_endpoints do |t|
      t.integer :user_id
      t.string :endpoint
      t.text :subscription
      t.timestamps null: false
    end

    add_index :web_push_endpoints, [:user_id]
    add_index :web_push_endpoints, [:endpoint], unique: true
  end
end
