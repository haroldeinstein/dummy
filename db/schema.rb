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

ActiveRecord::Schema.define(version: 2021_05_04_020640) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", id: :serial, force: :cascade do |t|
    t.string "address1"
    t.string "address2"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "auths", id: :serial, force: :cascade do |t|
    t.string "provider"
    t.string "uid"
    t.string "token"
    t.integer "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "verifier"
    t.index ["user_id"], name: "index_auths_on_user_id"
  end

  create_table "contact_lines", id: :serial, force: :cascade do |t|
    t.string "line"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contact_people", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "title"
  end

  create_table "directors", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "vimeo_username"
    t.text "bio"
    t.boolean "active", default: true
    t.string "vimeo_token"
  end

  create_table "memoir_descriptions", id: :serial, force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "memoirs", id: :serial, force: :cascade do |t|
    t.text "caption"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "news", id: :serial, force: :cascade do |t|
    t.string "title"
    t.string "video_url"
    t.string "thumbnail_large"
    t.string "thumbnail_medium"
    t.string "thumbnail_small"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.bigint "vimeo_id"
    t.integer "sort_index", default: 0
  end

  create_table "projects", id: :serial, force: :cascade do |t|
    t.integer "director_id"
    t.string "title"
    t.string "video_url"
    t.string "thumbnail_large"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "vimeo_id"
    t.string "thumbnail_small"
    t.string "thumbnail_medium"
    t.integer "sort_index", default: 0
  end

  create_table "rep_locations", id: :serial, force: :cascade do |t|
    t.string "location"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "sort_index", default: 0
    t.integer "column"
  end

  create_table "reps", id: :serial, force: :cascade do |t|
    t.integer "rep_location_id"
    t.string "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "email_address"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
