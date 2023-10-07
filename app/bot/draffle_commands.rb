module DraffleCommands

  def register_draffle_cmds
    register_application_command(:pick, "Make a selection in the current draffle", server_id: 1112702099944378491)
    application_command(:pick) do |event|
      @original_event = event
      @draffle = Draffle.find_by status: "started"
      if @draffle.nil?
        self.send_no_started_msg
      else
        @picker = @draffle.on_the_clock
        if @picker.discord_id.to_s == event.user.id.to_s
          self.send_draffle_selector          
        else
          self.send_reject_msg    
        end
      end
    end

    string_select do |event|
      discord_id = event.user.id
      prize_id = event.values[0]
      @prize = DrafflePrize.find_by id: prize_id
      event.interaction.defer_update
    end

    button do |event|
      puts "#{@picker.name} has selected #{@prize.name}"
      @draffle.pick @prize.id
      new_picker = @draffle.on_the_clock
      @original_event.interaction.delete_response

      event.channel.send_message "**THE PICK IS IN!**\n<@#{@picker.discord_id}> has chosen #{@prize.name} 👏"
      event.channel.send_file(File.open("#{Rails.root}/draffle.png"), caption: "Here is the updated draft pool 👇")
      if new_picker.nil?
        event.channel.send_message("#{@draffle.name} has officially ended. All picks are submitted!")
      else
        event.channel.send_message("⏱ <@#{new_picker.discord_id}> it's time for you to make your pick!")
      end
    end
  end


  private

  def send_draffle_selector
    @original_event.interaction.respond(
      content: "Here is a select",
      ephemeral: true,
      components: Discordrb::Components::View.new do |builder|
          builder.row do |r|
            r.string_select(custom_id: 'draffle_pick', placeholder: 'Test of StringSelect', max_values: 1) do |ss|
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
      content: "🛑 It's not your turn to pick. #{@picker.name} is currently on the clock",
      ephemeral: true,
    )
  end

  def send_no_started_msg
    @original_event.interaction.respond(
      content: "There is no active draffle to pick from. Please try again when a draffle has been started.",
      ephemeral: true,
    )
  end

end
