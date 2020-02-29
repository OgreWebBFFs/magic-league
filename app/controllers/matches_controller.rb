class MatchesController < ApplicationController
  def create
    date_time = DateTime.strptime(match_params[:date]+ " " + match_params[:time], "%Y-%m-%d %H:%M")
    loser = ([match_params[:playerA], match_params[:playerB]] - [match_params[:winner]]).first
    Match.create(winner_id: match_params[:winner], loser_id: loser, played_at: date_time)
    redirect_to :root
  end

  
  def index
    @matches = Match.order('played_at DESC')
  
  end

  def past_rankings
    @match_date = params[:match_date] ? DateTime.new(params[:match_date][:year].to_i, params[:match_date][:month].to_i, params[:match_date][:day].to_i) : DateTime.now
    @matches = Match.played_during_month(@match_date)
    @users = @users.select{|u| u.locked_at.nil? || @matches.any? {|m| m.winner_id == u.id || m.loser_id == u.id } }

    RankingEngine.new(@users, @matches).generate_rankings
    @rankings = @users.sort_by(&:ranking).reverse
    @ranked_players = @rankings.select { |user|
      user_wins = @matches.where(winner: user).count
      user_losses = @matches.where(loser: user).count
      user_wins + user_losses > 0
    }
    @unranked_players = @rankings.select { |user|
      user_wins = @matches.where(winner: user).count
      user_losses = @matches.where(loser: user).count
      user_wins + user_losses == 0
    }.sort_by{ |user| user.name }
  end

  private

  def match_params
    params.require(:match).permit(:playerA, :playerB, :winner, :date, :time) 
  end
end
