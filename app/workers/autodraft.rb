module Autodraft
  
  class Scheduler
    AUTODRAFT_QUEUE = "autodraft"
    
    def initialize
      self.class.clear
      Delayed::Job.enqueue(AutodraftWarningJob.new(0), :queue => AUTODRAFT_QUEUE, :run_at => 1.minute.from_now )
      Delayed::Job.enqueue(AutodraftWarningJob.new(1), :queue => AUTODRAFT_QUEUE, :run_at => 2.minutes.from_now)
      Delayed::Job.enqueue(AutodraftWarningJob.new(2), :queue => AUTODRAFT_QUEUE, :run_at => 3.minutes.from_now)
      Delayed::Job.enqueue(AutodraftPickJob.new, :queue => AUTODRAFT_QUEUE, :run_at => 4.minute.from_now)
    end

    def self.clear
      Delayed::Job.where(queue: AUTODRAFT_QUEUE).destroy_all
    end

  end

  private

  class AutodraftWarningJob < Struct.new(:warning_num)
    def perform
      OgreBot.instance.draffle_actions.autodraft_warning warning_num
    end
  end

  class AutodraftPickJob
    def perform
      draffle = Draffle.find_by status: "started"
      draffle.autopick
    end
  end

end