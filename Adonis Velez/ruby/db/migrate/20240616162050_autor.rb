class Autor < ActiveRecord::Migration[7.1]
  def change
    create_table :autor do |t|
      t.string :nombre, limit: 100
      t.string :bibliografia
    end
  end
end
