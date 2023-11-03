require_relative "draffle_messages"

module DraffleCommands
  include DraffleMessages

  COOLDOWN_DURATION = 10;

  def register_cmds
    @bot.register_application_command(:pick, "Open the card picker and take your turn. (Type \"/pick\" and hit enter. No need to type a card name)", server_id: ENV["DISCORD_SERVER_ID"])
    @bot.application_command(:pick) do |event|
      @original_event = event
      @draffle = Draffle.find_by status: "started"
      if @draffle.nil?
        send_no_started_msg
      else
        @picker = @draffle.on_the_clock
        if @picker.discord_id.to_s == event.user.id.to_s
          @wait = false
          @prize_groups = @draffle.available_prizes.each_slice(20).to_a
          @viewing_group = 0
          send_draffle_selector @prize_groups[0], false, @prize_groups.length > 1      
        else
          send_reject_msg    
        end
      end
    end

    @bot.string_select do |event|
      if event.values[0] == "NEXT"
        @original_event.interaction.delete_response
        @original_event = event
        @viewing_group = @viewing_group + 1
        show_next = @viewing_group < @prize_groups.length - 1
        send_draffle_selector @prize_groups[@viewing_group], true, show_next
      elsif event.values[0] == "PREV"
        @original_event.interaction.delete_response
        @original_event = event
        @viewing_group = @viewing_group - 1
        show_prev = @viewing_group > 0
        send_draffle_selector @prize_groups[@viewing_group], show_prev, true
      else
        prize_id = event.values[0]
        @prize = DrafflePrize.find_by id: prize_id
        event.interaction.defer_update
      end
    end

    @bot.button do |event|
      if @prize.nil? || @wait
        event.interaction.defer_update
      else
        @wait = true
        @original_event.interaction.delete_response
        @draffle.pick @prize.id
      end
    end
  end

  private

  def send_draffle_selector selections, show_prev, show_next
    @original_event.interaction.respond(
      content: DRAFFLE_PICK_PROMPT,
      ephemeral: true,
      components: Discordrb::Components::View.new do |builder|
          builder.row do |r|
            r.string_select(custom_id: "draffle_pick", placeholder: 'Please Select a Card', max_values: 1) do |ss|
              if (show_prev)
                ss.option(label: "◀◀ View Previous 👀", value: "PREV")
              end
              selections.each{ |prize| ss.option(label: prize.name, value: prize.id)}
              if (show_next) 
                ss.option(label: "👀 View Next ▶▶", value: "NEXT")
              end
            end
          end
          builder.row do |r|
            r.button(custom_id: 'draffle_pick_submit', label: 'Submit Selection', style: 1)
          end
        end
      )
  end

  def send_reject_msg
    @original_event.interaction.respond(
      content: DRAFFLE_NOT_YOUR_TURN % {name: @picker.name},
      ephemeral: true,
    )
  end

  def send_no_started_msg
    @original_event.interaction.respond(
      content: DRAFFLE_NOT_STARTED,
      ephemeral: true,
    )
  end
end