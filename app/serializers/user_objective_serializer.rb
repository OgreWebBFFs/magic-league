class UserObjectiveSerializer
  include FastJsonapi::ObjectSerializer
  attributes :assigned_at, :completed_at, :id
  
  attribute :objective do |user_objective|
    user_objective.objective.description
  end
end
