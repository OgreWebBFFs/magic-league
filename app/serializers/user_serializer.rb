class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :id 
end
