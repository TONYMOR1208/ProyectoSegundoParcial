class Genero < ActiveRecord::Migration[7.1]
  def change
    create_table :genero do |t|
      t.string :nombre, limit: 50

      t.timestamps
    end
  end
end
