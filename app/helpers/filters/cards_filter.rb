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
          if possible_colors.include? 'C'
            scope.where('colors && ARRAY[?]::varchar[] OR colors = ARRAY[]::varchar[]', possible_colors)
          else
            scope.where('colors && ARRAY[?]::varchar[]', possible_colors)
          end
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
      oracle_text_filter: {
        apply?: ->(params) {
          params[:oracle_text].is_a?(String)
        },
        apply: ->(scope, params) {
          scope.where('oracle_text ILIKE ?', "%#{ActiveRecord::Base.sanitize_sql params[:oracle_text]}%")
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
      card_types_filter: {
        apply?: ->(params) {
          params[:card_types].is_a?(String)
        },
        apply: ->(scope, params) {
          types_regex = params[:card_types].split(',').join('|')
          scope.where('type_line ~* ?', ".*(#{types_regex}).*(— .*)?")
        }
      }.freeze,
      sub_types_filter: {
        apply?: ->(params) {
          params[:sub_types].is_a?(String)
        },
        apply: ->(scope, params) {
          types_regex = params[:sub_types].split(',').join('|')
          scope.where('type_line ~* ?', ".* — .*(#{types_regex}).*")
        }
      }.freeze
    }.freeze

    def self.filters
      FILTERS
    end
  end
end