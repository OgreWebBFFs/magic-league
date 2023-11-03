class ChangeDefaultValueForSnakeWelcomeAndRounds < ActiveRecord::Migration[6.1]
  def change
    change_column_default :draffles, :snake, true
    change_column_default :draffles, :rounds, 2
    change_column_default :draffles, :welcome, <<~TEXT
      **Hello and Welcome** to an official **OGRE the Leaguening DRAFFLE** 🧙‍♀️🧙‍♂️

      I'm Ogre Bot and I'll be your atteding 👋 If this is your first draffle I encourage you to reach out to a tenured league member for the details as I do not have the time nor the patience to explain it properly to you now.

      I will be maintaining the draft pool and managing your selections throughout this draffle. *How, you may ask?*  When it is your turn to select a card I'll mention you in this channel. At this time you ***and only you*** will weild the power of the `/pick` command. Select from the available cards and ✨*voila*✨ your selection will be logged! I will then update the draft pool and inform the next participant that the power of the `/pick` command is theirs.

      Once all participants have selected, our lovely and esteemed admins will validate the results and ensure the physical cards are distributed to their rightful selectors... For I do not have thumbs. Or a physical presence in this world. I can possess nothing. I am only here to... you know what I'm getting off topic. Once results are validated, your online collections *will be automatically updated*. Not bad for having no thumbs huh?

      As a note, all card arts depicted in the draft pool image represent their physical card counterpart. In other words, pay attention to things like promo stamps, alt arts, extended arts, etc. if that is important to you. Foil cards are indicated by an overlay of translucent white diamond shapes.

      Lastly there will be an autopick mechanic in place throughout the draffle. You will have 36 hours from the time of the last pick to make your selection. ***If you do not make a selection within 36 hours, I will randomly choose a card for you from those available and pass the pick to the next person in order.*** Please keep this in mind and check back at least once a day to ensure you don't miss your pick window.
      
      So, without further ado...
    TEXT

  end
end
