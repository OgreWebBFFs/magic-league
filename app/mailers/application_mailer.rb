class ApplicationMailer < ActionMailer::Base
  default bcc: 'ogretheleaguening@gmail.com'
  layout 'mailer'
end
