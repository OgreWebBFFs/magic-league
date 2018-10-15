class ApplicationMailer < ActionMailer::Base
  default from: 'ogretheleaguening@gmail.com', bcc: 'ogretheleaguening@gmail.com'
  layout 'mailer'
end
