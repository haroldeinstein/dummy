# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171201054649) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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

end
