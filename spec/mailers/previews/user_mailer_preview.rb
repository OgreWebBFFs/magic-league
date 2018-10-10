# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def trade_proposal_email()
    UserMailer.trade_proposal_email(User.first.id, User.last.id, Card.first.id)
  end
end
