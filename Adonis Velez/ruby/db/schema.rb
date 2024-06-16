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

ActiveRecord::Schema[7.1].define(version: 2024_06_16_165707) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "autor", force: :cascade do |t|
    t.string "nombre", limit: 100
    t.string "bibliografia"
  end

  create_table "devolucion", force: :cascade do |t|
    t.integer "prestamo_id"
    t.date "fecha_devolucion"
    t.string "estado_libro", limit: 100
  end

  create_table "genero", force: :cascade do |t|
    t.string "nombre", limit: 50
  end

  create_table "libro", force: :cascade do |t|
    t.string "titulo"
    t.integer "autor_id"
    t.integer "genero_id"
    t.string "editorial"
    t.integer "año_publicacion"
    t.integer "num_ejemplares"
  end

  create_table "prestamo", force: :cascade do |t|
    t.integer "libro_id"
    t.integer "usuario_id"
    t.date "fecha_prestamo"
    t.date "fecha_vencimiento"
    t.boolean "devuelto"
  end

  create_table "resena", force: :cascade do |t|
    t.integer "libro_id"
    t.integer "usuario_id"
    t.integer "calificacion"
    t.text "comentario"
  end

  create_table "reserva", force: :cascade do |t|
    t.integer "libro_id"
    t.integer "usuario_id"
    t.date "fecha_reserva"
    t.date "fecha_expiracion"
  end

  create_table "sancion", force: :cascade do |t|
    t.integer "usuario_id"
    t.date "fecha_inicio"
    t.date "fecha_fin"
    t.string "descripcion"
  end

  create_table "usuario", force: :cascade do |t|
    t.string "nombre", limit: 100
    t.string "direccion", limit: 200
    t.string "telefono", limit: 10
    t.string "correo", limit: 100
    t.date "fecha_registro"
  end

  add_foreign_key "devolucion", "prestamo"
  add_foreign_key "libro", "autor"
  add_foreign_key "libro", "genero"
  add_foreign_key "prestamo", "libro"
  add_foreign_key "prestamo", "usuario"
  add_foreign_key "resena", "libro"
  add_foreign_key "resena", "usuario"
  add_foreign_key "reserva", "libro"
  add_foreign_key "reserva", "usuario"
  add_foreign_key "sancion", "usuario"
end
