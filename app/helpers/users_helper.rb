module UsersHelper
  def gravatar(user = nil, size = 207)
    default_image = URI.encode(image_url('user.png'))

    image_path = "#{user&.gravatar_path}?s=#{size}"
    image_path = image_path + "&d=#{default_image}" unless Rails.env == 'development'

    image_tag image_path
  end
end