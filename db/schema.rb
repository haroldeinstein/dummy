# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150715150301) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string   "address1",   limit: 255
    t.string   "address2",   limit: 255
    t.string   "city",       limit: 255
    t.string   "state",      limit: 255
    t.string   "zip",        limit: 255
    t.string   "phone",      limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "auths", force: :cascade do |t|
    t.string   "provider",   limit: 255
    t.string   "uid",        limit: 255
    t.string   "token",      limit: 255
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "verifier",   limit: 255
  end

  add_index "auths", ["user_id"], name: "index_auths_on_user_id", using: :btree

  create_table "contact_lines", force: :cascade do |t|
    t.string   "line",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contact_people", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "email",      limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title",      limit: 255
  end

  create_table "directors", force: :cascade do |t|
    t.string   "name",           limit: 255
    t.string   "url",            limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "vimeo_username", limit: 255
    t.text     "bio"
  end

  create_table "memoir_descriptions", force: :cascade do |t|
    t.string   "title",       limit: 255
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "memoirs", force: :cascade do |t|
    t.text     "caption"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name",    limit: 255
    t.string   "image_content_type", limit: 255
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "news", force: :cascade do |t|
    t.string   "title",            limit: 255
    t.string   "video_url",        limit: 255
    t.string   "thumbnail_large",  limit: 255
    t.string   "thumbnail_medium", limit: 255
    t.string   "thumbnail_small",  limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "vimeo_id",         limit: 8
    t.integer  "sort_index",                   default: 0
  end

  create_table "projects", force: :cascade do |t|
    t.integer  "director_id"
    t.string   "title",            limit: 255
    t.string   "video_url",        limit: 255
    t.string   "thumbnail_large",  limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "vimeo_id"
    t.string   "thumbnail_small",  limit: 255
    t.string   "thumbnail_medium", limit: 255
    t.integer  "sort_index",                   default: 0
  end

  create_table "rep_locations", force: :cascade do |t|
    t.string   "location",   limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "sort_index",             default: 0
    t.integer  "column"
  end

  create_table "reps", force: :cascade do |t|
    t.integer  "rep_location_id"
    t.string   "name",            limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email_address",   limit: 255
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        limit: 255
    t.string   "password_digest", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
