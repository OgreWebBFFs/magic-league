require 'test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest
  test "should get :show," do
    get user_:show,_url
    assert_response :success
  end

  test "should get :edit," do
    get user_:edit,_url
    assert_response :success
  end

  test "should get :update" do
    get user_:update_url
    assert_response :success
  end

end
