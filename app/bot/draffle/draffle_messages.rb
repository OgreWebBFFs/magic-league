module DraffleMessages

  DRAFFLE_WELCOME = <<~TEXT
    **Hello and Welcome** to an official **OGRE the Leaguening DRAFFLE** 🧙‍♀️🧙‍♂️

    I'm Ogre Bot and I'll be your atteding for this draffle 👋 If this is your first draffle I encourage you to reach out to a tenured league member for the details as I do not have the time nor the patience to explain it properly to you now.

    I will be maintaining the draft pool and managing your selections throughout this draffle. *How, you may ask?*  When it is your turn to select a card I'll mention you in this channel. At this time you ***and only you*** will weild the power of the `/pick` command. Select from the available cards and ✨*voila*✨ your selection will be logged! I will then update the draft pool and inform the next participant that the power of the `/pick` command has shifted into their possession.

    If at any time you (or far more unlikely *I*) make a mistake, please message an admin and the draffle can be paused and corrected.

    Once all participants have selected our lovely and esteemed admins will validate the results and ensure the physical cards are distributed to their rightful selectors... For I do not have thumbs. Or a physical presence in this world. I can possess nothing. I am only here to... you know what I'm getting off topic.

    As a note, all card arts depicted in the draft pool image represent their physical card counterpart. In other words, pay attention to things like promo stamps, alt arts, extended arts, etc. if that is important to you. Foil cards are indicated by an overlay of translucent white diamond shapes because making things shinny on a screen is hard for a bot like me.
    
    So, without further ado...
  TEXT

  DRAFFLE_START = <<~TEXT
    %{name} has started!
    Here is our selection order:
    %{board}
  TEXT

  DRAFFLE_PAUSE = "%{name} has been paused. The power of the `/pick` command has been temporarily revoked."

  DRAFFLE_END = "%{name} has ended. All picks are submitted and pending validation by the admins!"

  DRAFFLE_YOUR_TURN = "⚡ <@%{discord_id}> you now wield the power of the `/pick` command. *Use it wisely...*"

  DRAFFLE_PICK_PROMPT = "You have invoked the power of the `/pick` command. You may now make your selection."

  DRAFFLE_ANOUNCE_PICK = "🚨🚨 **THE PICK IS IN!** 🚨🚨\n%{name} (<@%{discord_id}>) has chosen **__%{prize}__** 👏"

  DRAFFLE_NOT_YOUR_TURN = "🛑 It's not your turn to pick. %{name} is currently on the clock"

  DRAFFLE_NOT_STARTED = "There is no active draffle to pick from. Please try again when a draffle has been started."
end
