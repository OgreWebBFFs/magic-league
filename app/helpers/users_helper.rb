module UsersHelper
  def gravatar(user = nil, size = 207)
    default_image = URI.encode(image_url('user.png'))
    image_tag "#{user&.gravatar_path}?s=#{size}&d=#{default_image}"
  end
end