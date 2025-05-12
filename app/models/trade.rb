class Trade < ApplicationRecord
  has_many :exchanges
  has_many :cards, through: :exchanges

  def users
    User.where(id: exchanges.pluck(:from_user_id, :to_user_id).flatten.uniq)
  end

  def approve user_id
    return if status == 'approved'
    approvals = (status || '').split('|').map(&:to_i)
    return if approvals.include?(user_id)
    approvals << user_id
    if all_participants_approved?(approvals)
      execute_trade
      self.status = 'approved'
      # OgreBot.instance.trade_alerts.trade_accepted trade
    else
      self.status = approvals.join('|')
    end
    save!
  end

  def reject
    self.status = 'rejected'
    # OgreBot.instance.trade_alerts.trade_rejected trade
    save!
  end

  private

  def all_participants_approved?(approvals)
    user_ids = exchanges.flat_map { |e| [e.from_user_id, e.to_user_id] }.uniq
    (user_ids - approvals).empty?
  end

  def execute_trade
    exchanges.each do |exchange|
      exchange.execute        
    end
  end
end
