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

ActiveRecord::Schema[7.0].define(version: 2023_04_27_125142) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ecommerce_websites", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.integer "price"
    t.float "rating"
    t.integer "delivery_cost"
    t.string "mode"
    t.bigint "ecommerce_website_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_url"
    t.string "website_url"
    t.string "website_name"
    t.index ["ecommerce_website_id"], name: "index_products_on_ecommerce_website_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "ecommerce_websites_id", null: false
    t.decimal "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ecommerce_websites_id"], name: "index_ratings_on_ecommerce_websites_id"
    t.index ["product_id"], name: "index_ratings_on_product_id"
  end

  create_table "search_histories", force: :cascade do |t|
    t.string "query"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_search_histories_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_url"
  end

  add_foreign_key "products", "ecommerce_websites"
  add_foreign_key "ratings", "ecommerce_websites", column: "ecommerce_websites_id"
  add_foreign_key "ratings", "products"
  add_foreign_key "search_histories", "users"
end
