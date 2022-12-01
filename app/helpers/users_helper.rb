module UsersHelper
  def gravatar(user = nil, size = 154)
    image_path = "#{user&.gravatar_path}?s=#{size}&d=mp"

    image_path
  end

  def checked_if_tradable(tradables, card)
    if !tradables.nil? && tradables.where(card_id: card.id).count > 0
      return "checked='checked' data-tradable-id=#{tradables.where(card_id: card.id).first.id}"
    end
  end

  def disabled_if_not_current_user(user)
    if @user.id != current_user.id
      'disabled'
    end
  end
end
