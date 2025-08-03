module TradeAlertMessages

  TRADE_REQUESTED = <<~TEXT
      Hey there 👋 I'm just here to let you know you've got a trade request!

      %{trade}

      [Click here](%{review_link}) to review your trade
    TEXT

  TRADE_ACCEPTED = <<~TEXT
    Your trade with %{users} has been ✅*ACCEPTED*✅ 

    %{trade}

    Your card collection and trade allotments have been updated accordingly. Congratulations 🎉
  TEXT

  TRADE_REJECTED = <<~TEXT
    Your trade with %{users} was ❌*REJECTED*❌

    %{trade}

    You can reach out to them on discord by selecting their handle above to work out another deal.
  TEXT

  TRADE_ERROR = <<~TEXT
    There was an ❗*ERROR*❗ processing a trade you were involved in.

    %{trade}

    Cannot be processed for the following reasons:
    %{invalid_targets}
  TEXT
end
