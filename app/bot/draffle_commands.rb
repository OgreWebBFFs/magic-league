require_relative "draffle_messages"

module DraffleCommands
  include DraffleMessages
  
  def register_cmds
    @bot.register_application_command(:pick, "Make a selection in the current draffle", server_id: ENV["DISCORD_SERVER_ID"])
    @bot.application_command(:pick) do |event|
      @original_event = event
      @draffle = Draffle.find_by status: "started"
      if @draffle.nil?
        send_no_started_msg
      else
        @picker = @draffle.on_the_clock
        if @picker.discord_id.to_s == event.user.id.to_s
          send_draffle_selector          
        else
          send_reject_msg    
        end
      end
    end

    @bot.string_select do |event|
      prize_id = event.values[0]
      @prize = DrafflePrize.find_by id: prize_id
      event.interaction.defer_update
    end

    @bot.button do |event|
      if @prize.nil?
        event.interaction.defer_update
      else
        @original_event.interaction.delete_response
        @draffle.pick @prize.id
        @prize = nil
      end
    end
  end

  private

  def send_draffle_selector
    @original_event.interaction.respond(
      content: DRAFFLE_PICK_PROMPT,
      ephemeral: true,
      components: Discordrb::Components::View.new do |builder|
          builder.row do |r|
            r.string_select(custom_id: 'draffle_pick', placeholder: 'Please Select a Card', max_values: 1) do |ss|
              @draffle.available_prizes.each{ |prize| ss.option(label: prize.name, value: prize.id)}
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