module DraffleCommands

  def register_cmds
    register_application_command(:test, "Make a selection in the current draffle", server_id: 1112702099944378491)
    application_command(:test) do |event|
      ActiveRecord::Base.transaction do
        # puts event.user.id
        draffle = Draffle.find_by status: "started"
        event.channel.send_file(File.open("#{Rails.root}/draffle.png"), caption: "Draffle Image")
        event.interaction.respond(
          content: "Here is a select",
          ephemeral: true,
          components: Discordrb::Components::View.new do |builder|
              builder.row do |r|
                r.string_select(custom_id: 'draffle_pick', placeholder: 'Test of StringSelect', max_values: 1) do |ss|
                  draffle.draffle_prizes.filter { |prize| prize.available? }.sort_by(&:id).each{ |prize| ss.option(label: prize.name, value: prize.id)}
                end
              end
              builder.row do |r|
                r.button(custom_id: 'draffle_pick_submit', label: 'Submit Selection', style: 1)
              end
            end
          )
      end
    end

    string_select do |event|
      discord_id = event.user.id
      prize_id = event.values[0]
      @picker = User.find_by discord_id: discord_id
      @prize = DrafflePrize.find_by id: prize_id
      event.interaction.defer_update
    end

    button do |event|
      draffle = Draffle.find_by status: "started"
      puts "#{@picker.name} has selected #{@prize.name}"
      draffle.pick @prize.id
      event.interaction.respond(
        content: "**THE PICK IS IN!**\nYou have chosen the values: #{@prize.name}",
      )
    end
  end


end
