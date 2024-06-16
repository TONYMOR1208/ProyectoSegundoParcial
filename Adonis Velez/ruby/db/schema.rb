# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_19_163724) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "devolucion", force: :cascade do |t|
    t.integer "prestamo_id"
    t.date "fecha_devolucion"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "editorial", force: :cascade do |t|
    t.string "nombre", limit: 100
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "genero", force: :cascade do |t|
    t.string "nombre", limit: 50
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "libro", force: :cascade do |t|
    t.string "titulo", limit: 255
    t.string "autor", limit: 255
    t.integer "genero_id"
    t.integer "ano_publicacion"
    t.integer "num_ejemplares"
    t.integer "editorial_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "prestamo", force: :cascade do |t|
    t.integer "libro_id"
    t.integer "usuario_id"
    t.date "fecha_prestamo"
    t.date "fecha_vencimiento"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "usuario", force: :cascade do |t|
    t.string "nombre", limit: 255
    t.string "direccion", limit: 255
    t.string "telefono", limit: 10
    t.string "correo", limit: 255
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "devolucion", "prestamo"
  add_foreign_key "libro", "editorial"
  add_foreign_key "libro", "genero"
  add_foreign_key "prestamo", "libro"
  add_foreign_key "prestamo", "usuario"
end
