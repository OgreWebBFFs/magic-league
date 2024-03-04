module Filters
  class CardsFilter < Filters::GenericFilter
    FILTERS = {
      generic_query_filter: {
        apply?: ->(params) {
          params[:query].is_a?(String)
        },
        apply: ->(scope, params) {
          scope.where('name ILIKE :query OR oracle_text ILIKE :query OR type_line ILIKE :query', query: "%#{ActiveRecord::Base.sanitize_sql params[:query]}%")
        }
      }.freeze,
      colors_filter: {
        apply?: ->(params) {
          params[:colors].is_a?(String)
        },
        apply: ->(scope, params) {
          possible_colors = params[:colors].split(',').map{ |x|  "#{ActiveRecord::Base.sanitize_sql x}" }
          scope.where('colors && ARRAY[?]::varchar[]', possible_colors)
        }
      }.freeze,
      name_filter: {
        apply?: ->(params) {
          params[:name].is_a?(String)
        },
        apply: ->(scope, params) {
          scope.where('name ILIKE ?', "%#{ActiveRecord::Base.sanitize_sql params[:name]}%")
        }
      }.freeze,
      owned_filter: {
        apply?: ->(params) {
          params[:owned] === 'true'
        },
        apply: ->(scope, params) {
          scope.joins(:ownerships).group('cards.id').having('COUNT(ownerships.id) > ?', 0)
        }
      }.freeze,
      rarity_filter: {
        apply?: ->(params) {
          ['common', 'uncommon', 'rare', 'mythic'].include? params[:rarity]
        },
        apply: ->(scope, params) {
          scope.where('rarity = ?', params[:rarity])
        }
      },
      types_filter: {
        apply?: ->(params) {
          params[:types].is_a?(String)
        },
        apply: ->(scope, params) {
          types_regex = params[:types].split(',').join('|')
          scope.where('type_line ~* ?', types_regex)
        }
      }.freeze
    }.freeze

    def self.filters
      FILTERS
    end
  end
end