module UsersHelper
  def gravatar(user = nil, size = 154)
    image_path = "#{user&.gravatar_path}?s=#{size}&d=mp"

    image_path
  end

  def disabled_if_not_current_user(user)
    if @user.id != current_user.id
      'disabled'
    end
  end
end
