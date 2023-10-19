module DraffleMessages

  DRAFFLE_START = <<~TEXT
    ## %{name} has started!

    Here is our selection order:
  TEXT

  DRAFFLE_PAUSE = <<~TEXT
    ## %{name} has been paused
    
    The power of the `/pick` command has been temporarily revoked.
  TEXT

  DRAFFLE_END = "%{name} has ended. All picks are submitted and pending validation by the admins!"

  DRAFFLE_COMPLETE = <<~TEXT
    ## %{name} has been validated and completed 🏁
    
    **Thank you**" for participating in this draffle. I hope you had as much fun as I did and got some schweet bling 💍😉 At this time, all collections have been updated with the appropriate selections. Please coordinate with an admin to get your cards in hand.
    
    Until next time, this is **OGRE BOT** signing off 👋 Over and Out!
  TEXT

  DRAFFLE_YOUR_TURN = "⚡ %{discord_tag}  you now wield the power of the `/pick` command. *Use it wisely...*"

  DRAFFLE_PICK_PROMPT = "You have invoked the power of the `/pick` command. You may now make your selection."

  DRAFFLE_ANNOUNCE_PICK = "🚨🚨 **THE PICK IS IN!** 🚨🚨\n%{discord_tag} has chosen **__%{prize}__** 👏"

  DRAFFLE_ANNOUNCE_AUTOPICK = "🚨🚨 **TIME'S UP! 😞** 🚨🚨\nBut don't worry, I picked you a *great* card!\n%{discord_tag} gets **__%{prize}__** 👏"

  DRAFFLE_NOT_YOUR_TURN = "🛑 It's not your turn to pick. %{name} is currently on the clock"

  DRAFFLE_NOT_STARTED = "There is no active draffle to pick from. Please try again when a draffle has been started."

  DRAFFLE_AUTODRAFT_WARNING = <<~TEXT
    ⏳ %{warning} !
    %{discord_tag} you are currently picking and have until %{time} to select.
    If you do not make a selection by this time *I will randomly pick a card for you from the available cards*
  TEXT
end
