class UserMailer < ApplicationMailer
  def trade_proposal_email(from_user_id, to_user_id, card_id)
    @to_user = User.find(to_user_id)
    @from_user = User.find(from_user_id)
    @card = Card.find(card_id)
    mail(to: @to_user.email, from: "#{@from_user.name} <#{@from_user.email}>", cc: @from_user.email, subject: "#{@from_user.name} wants your #{@card.name}")
  end
end
