class Editorial < ActiveRecord::Migration[7.1]
  def change
    create_table :editorial do |t|
      t.string :nombre, limit: 100

      t.timestamps
    end
  end
end
