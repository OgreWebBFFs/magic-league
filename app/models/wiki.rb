class Wiki < ApplicationRecord
  before_validation :generate_slug

  validates :slug, presence: true, uniqueness: true

  def to_param
    slug
  end

  def generate_slug
    self.slug = title.parameterize if title.present? && slug.blank?
  end

  def child_pages
    Wiki.where(id: children)
  end
end
