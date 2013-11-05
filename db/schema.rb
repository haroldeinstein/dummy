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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131105142721) do

  create_table "addresses", :force => true do |t|
    t.string   "address1"
    t.string   "address2"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "phone"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "auths", :force => true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "token"
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "verifier"
  end

  add_index "auths", ["user_id"], :name => "index_auths_on_user_id"

  create_table "contact_lines", :force => true do |t|
    t.string   "line"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "contact_people", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "title"
  end

  create_table "directors", :force => true do |t|
    t.string   "name"
    t.string   "url"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.string   "vimeo_username"
  end

  create_table "memoir_descriptions", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "memoirs", :force => true do |t|
    t.text     "caption"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "news", :force => true do |t|
    t.string   "title"
    t.string   "video_url"
    t.string   "thumbnail_large"
    t.string   "thumbnail_medium"
    t.string   "thumbnail_small"
    t.datetime "created_at",                                   :null => false
    t.datetime "updated_at",                                   :null => false
    t.integer  "vimeo_id",         :limit => 8
    t.integer  "sort_index",                    :default => 0
  end

  create_table "projects", :force => true do |t|
    t.integer  "director_id"
    t.string   "title"
    t.string   "video_url"
    t.string   "thumbnail_large"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.integer  "vimeo_id"
    t.string   "thumbnail_small"
    t.string   "thumbnail_medium"
    t.integer  "sort_index",       :default => 0
  end

  create_table "rep_locations", :force => true do |t|
    t.string   "location"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
    t.integer  "sort_index", :default => 0
    t.integer  "column"
  end

  create_table "reps", :force => true do |t|
    t.integer  "rep_location_id"
    t.string   "name"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.string   "email_address"
  end

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "password_digest"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

end
