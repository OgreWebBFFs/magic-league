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

ActiveRecord::Schema.define(version: 2023_09_20_173202) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.string "set"
    t.string "image_url"
    t.string "multiverse_id"
    t.string "oracle_text"
    t.string "type_line"
    t.string "mana_cost"
    t.decimal "cmc"
    t.string "colors", default: [], array: true
    t.string "rarity"
  end

  create_table "collections", force: :cascade do |t|
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "draffle_participants", force: :cascade do |t|
    t.integer "order"
    t.bigint "user_id"
    t.bigint "draffle_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["draffle_id"], name: "index_draffle_participants_on_draffle_id"
    t.index ["user_id"], name: "index_draffle_participants_on_user_id"
  end

  create_table "draffle_prizes", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.string "card_id"
    t.boolean "foiled"
    t.bigint "draffle_id"
    t.bigint "draffle_participant_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["draffle_id"], name: "index_draffle_prizes_on_draffle_id"
    t.index ["draffle_participant_id"], name: "index_draffle_prizes_on_draffle_participant_id"
  end

  create_table "draffles", force: :cascade do |t|
    t.string "name", default: "New Draffle"
    t.string "status", default: "created"
    t.integer "rounds", default: 1
    t.boolean "snake", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "exchanges", force: :cascade do |t|
    t.bigint "card_id"
    t.bigint "user_id"
    t.bigint "trade_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_id"], name: "index_exchanges_on_card_id"
    t.index ["trade_id"], name: "index_exchanges_on_trade_id"
    t.index ["user_id"], name: "index_exchanges_on_user_id"
  end

  create_table "matches", force: :cascade do |t|
    t.integer "winner_id"
    t.integer "loser_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "played_at"
    t.integer "participants"
    t.integer "event_id"
  end

  create_table "objectives", force: :cascade do |t|
    t.string "description"
    t.integer "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ownerships", force: :cascade do |t|
    t.bigint "collection_id"
    t.bigint "card_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_id"], name: "index_ownerships_on_card_id"
    t.index ["collection_id"], name: "index_ownerships_on_collection_id"
  end

  create_table "received_trades", force: :cascade do |t|
    t.bigint "user_id"
    t.string "rarity"
    t.integer "num_received"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_received_trades_on_user_id"
  end

  create_table "rerolls", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "used", default: 0
    t.integer "allowed", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_rerolls_on_user_id"
  end

  create_table "results", force: :cascade do |t|
    t.bigint "match_id"
    t.integer "user_id"
    t.integer "place"
    t.index ["match_id"], name: "index_results_on_match_id"
  end

  create_table "settings", force: :cascade do |t|
    t.date "season_start_date", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.integer "season_length", default: 365, null: false
    t.integer "base_trade_sets", default: 1, null: false
    t.integer "bonus_trade_users", default: [], null: false, array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tradables", force: :cascade do |t|
    t.bigint "card_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_id"], name: "index_tradables_on_card_id"
    t.index ["user_id"], name: "index_tradables_on_user_id"
  end

  create_table "trades", force: :cascade do |t|
    t.integer "from_user"
    t.integer "to_user"
    t.string "status", default: "pending"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_objectives", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "objective_id"
    t.boolean "keep", default: false
    t.datetime "assigned_at"
    t.datetime "completed_at"
    t.index ["objective_id"], name: "index_user_objectives_on_objective_id"
    t.index ["user_id"], name: "index_user_objectives_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false, null: false
    t.integer "failed_attempts", default: 0, null: false
    t.datetime "locked_at", default: -> { "CURRENT_TIMESTAMP" }
    t.string "discord_id"
    t.string "discord_username"
    t.string "pronouns"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "wishes", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "card_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_id"], name: "index_wishes_on_card_id"
    t.index ["user_id"], name: "index_wishes_on_user_id"
  end

  add_foreign_key "draffle_prizes", "draffles"
  add_foreign_key "received_trades", "users"
  add_foreign_key "user_objectives", "objectives"
  add_foreign_key "user_objectives", "users"
end
