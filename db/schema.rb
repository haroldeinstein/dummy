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

ActiveRecord::Schema.define(:version => 20130925181934) do

  create_table "directors", :force => true do |t|
    t.string   "name"
    t.string   "url"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.string   "vimeo_username"
  end

  create_table "memoirs", :force => true do |t|
    t.text     "caption"
    t.string   "image"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "news", :force => true do |t|
    t.string   "title"
    t.string   "video_url"
    t.string   "thumbnail_large"
    t.string   "thumbnail_medium"
    t.string   "thumbnail_small"
    t.datetime "created_at",                                   :null => false
    t.datetime "updated_at",                                   :null => false
    t.integer  "wiredrive_id",     :limit => 8
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
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "sort_index"
  end

  add_index "rep_locations", ["sort_index"], :name => "index_rep_locations_on_sort_index"

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
