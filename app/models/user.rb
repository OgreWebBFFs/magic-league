class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, :trackable,
    :lockable, :omniauthable, omniauth_providers: [:google_oauth2]

  before_create :add_collection

  attr_accessor :ranking

  has_one :collection
  has_many :ownerships, through: :collection
  has_many :cards, through: :ownerships
  has_many :received_trades
  has_many :wishes
  has_many :wins, class_name: 'Match', foreign_key: 'winner_id'
  has_many :losses, class_name: 'Match', foreign_key: 'loser_id'
  has_many :user_objectives
  has_many :objectives, through: :user_objectives
  has_many :draffle_participants
  has_one :reroll

  scope :unlocked, -> { self.where(locked_at: nil) }

  def matches
    match_ids = Result.where("user_id = ?", id).pluck(:match_id)
    Match.where(id: match_ids)
  end

  def victories
    victory_ids = Result.where("user_id = ? AND place = 1", id).pluck(:match_id)
    Match.where(id: victory_ids)
  end
   
  def trades
    Trade.where("from_user = ? OR to_user = ?", id, id).order('created_at DESC')
  end

  def has_pending_trade_offer?
    self.trades.where("to_user = ? AND status = ?", id, "pending").length > 0
  end

  def wishlist
    wishes.map{ |wish| { card: wish.card, availablities: wish.availablities, total: wish.total }}
  end

  def add_card(card)
    collection.add_card card
  end

  def remove_card(card)
    collection.remove_card card
  end

  def add_card_by_id card_id
    card = Card.where(id: card_id).first
    add_card card
  end

  def remove_card_by_id card_id
    card = Card.where(id: card_id).first
    remove_card card
  end

  def trades_received_and_allowed_by_rarity
    trades = [];
    ReceivedTrade::NUM_PER_PACK_BY_RARITY.keys.each do |rarity|
      num_allowed = ReceivedTrade.num_allowed(rarity, id)
      received = received_trades.where(rarity: rarity).first
      num_received = received ? received.num_received : 0
      trades << {:rarity => rarity, :num_received => num_received, :num_allowed => num_allowed}
    end
    trades
  end

  def available_trades_for_rarity(rarity)
    received = received_trades.where(rarity: rarity).first
    num_received = received ? received.num_received : 0
    ReceivedTrade.num_allowed(rarity, id) - num_received
  end

  def has_available_rerolls
    self.reroll.used < self.reroll.allowed
  end

  def use_a_reroll
    used_rerolls = self.reroll.used
    self.reroll.update(used: used_rerolls + 1)
  end
  
  def completed_objectives
    self.user_objectives.where.not(completed_at: nil)
  end

  def card_inventory card_id
    ownership = self.ownerships.where(card_id: card_id).first
    if ownership.nil?
      0
    else
      ownership.quantity
    end
  end

  def to_s
    email
  end

  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(email: data['email']).first

    # Uncomment the section below if you want users to be created if they don't exist
    unless user
      user = User.create(name: data['name'],
                         email: data['email'],
                         password: Devise.friendly_token[0,20]
                        )
    end
    user
  end

  def gravatar_path
    hash = Digest::MD5.hexdigest(self.email.downcase) if self.email
    image_src = "https://www.gravatar.com/avatar/#{hash}"
  end

  def register_discord discord_profile
    self.update(discord_id: discord_profile["id"], discord_username: discord_profile["username"])
  end

  def discord_tag
    "#{sanitize(self.name)} (<@#{self.discord_id}>)"
  end

  private

  def add_collection
    self.collection = Collection.new
  end

  def sanitize text
    text.gsub(/(_|`|\*|~|_|`|\*|~|(?<!<@\d{18})>|\||#|-)/, '\\\\\1')
  end


end
