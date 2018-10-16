module UsersHelper
  def gravatar(user = nil, size = 207)
    image_tag "#{user&.gravatar_path}?s=#{size}"
  end
end
