module Filters
  class CardsFilter < Filters::GenericFilter
    FILTERS = {
      generic_query_filter: {
        apply?: ->(params) {
          params[:query].is_a?(String)
        },
        apply: ->(scope, params) {
          scope.where('cards.name ILIKE :query OR oracle_text ILIKE :query OR type_line ILIKE :query', query: "%#{ActiveRecord::Base.sanitize_sql params[:query]}%")
        }
      }.freeze,
      colors_exact_filter: {
        apply?: ->(params) {
          params[:colors_exact].is_a?(String)
        },
        apply: ->(scope, params) {
          possible_colors = params[:colors_exact].split(',').sort.map{ |x|  "#{ActiveRecord::Base.sanitize_sql x}" }
          if possible_colors[0] === 'colorless'
            scope.where('colors = ARRAY[]::varchar[]')
          else
            scope.where('ARRAY(SELECT unnest(colors) ORDER BY 1) = ARRAY[?]::varchar[]', possible_colors)
          end
        }
      }.freeze,
      colors_include_filter: {
        apply?: ->(params) {
          params[:colors_include].is_a?(String)
        },
        apply: ->(scope, params) {
          possible_colors = params[:colors_include].split(',').map{ |x|  "#{ActiveRecord::Base.sanitize_sql x}" }
          if possible_colors[0] === 'colorless'
            scope.where('colors = ARRAY[]::varchar[]')
          else
            scope.where('colors @> ARRAY[?]::varchar[]', possible_colors)
          end
        }
      }.freeze,
      colors_atmost_filter: {
        apply?: ->(params) {
          params[:colors_atmost].is_a?(String)
        },
        apply: ->(scope, params) {
          possible_colors = params[:colors_atmost].split(',').map{ |x|  "#{ActiveRecord::Base.sanitize_sql x}" }
          if possible_colors[0] === 'colorless'
            scope.where('colors = ARRAY[]::varchar[]')
          else
            scope.where('colors <@ ARRAY[?]::varchar[]', possible_colors)
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
          params[:rarity].is_a?(String) && params[:rarity].split(',').all? { |r|
            ['common', 'uncommon', 'rare', 'mythic'].include? r
          }
        },
        apply: ->(scope, params) {
          scope.where(rarity: params[:rarity].split(','))
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
          scope.where('type_line ~* ?', "—.*\s(#{types_regex})\s?.*")
        }
      }.freeze,
      sets_filter: {
        apply?: ->(params) {
          params[:sets].is_a?(String) 
        },
        apply: ->(scope, params) {
          scope.where("LOWER(set) IN (?)", params[:sets].downcase.split(','))
        }
      }.freeze,
      always_apply: {
        apply?: -> (params) { true },
        apply: ->(scope, params) {
          scope.where.not("type_line ILIKE ?", "%basic land%")
        }
      }.freeze,
      user_owns_filter: {
        apply?: ->(params) {
          params[:user].present? && User.exists?(id: params[:user])
        },
        apply: ->(scope, params) {
          scope.joins(ownerships: { collection: :user })
            .where(collections: { user_id: params[:user] })
            .distinct
        }
      }
    }.freeze

    def self.filters
      FILTERS
    end
  end
end