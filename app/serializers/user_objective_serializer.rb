class UserObjectiveSerializer
  include FastJsonapi::ObjectSerializer
  attributes :assigned_at, :id, :keep
  
  attribute :completed_at do |user_objective|
    if user_objective.completed_at != nil
      user_objective.completed_at.strftime("%b #{user_objective.completed_at.day.ordinalize}")
    else
      nil
    end
  end

  attribute :description do |user_objective|
    user_objective.objective.description
  end
end
