class Wiki < ApplicationRecord
  belongs_to :parent, class_name: "Wiki", optional: true
  has_many :children, class_name: "Wiki", foreign_key: "parent_id"

  before_validation :generate_slug

  validates :slug, presence: true, uniqueness: true

  def to_param
    slug
  end

  def generate_slug
    self.slug = title.parameterize if title.present? && slug.blank?
  end
end
