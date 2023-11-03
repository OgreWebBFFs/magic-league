module Autodraft
  
  class Scheduler
    AUTODRAFT_QUEUE = "autodraftqueue"
    
    def initialize
      self.class.clear
      Delayed::Job.enqueue(AutodraftWarningJob.new(0), :queue => AUTODRAFT_QUEUE, :run_at => 24.hours.from_now)
      Delayed::Job.enqueue(AutodraftWarningJob.new(1), :queue => AUTODRAFT_QUEUE, :run_at => 30.hours.from_now)
      Delayed::Job.enqueue(AutodraftWarningJob.new(2), :queue => AUTODRAFT_QUEUE, :run_at => 35.hours.from_now)
      Delayed::Job.enqueue(AutodraftPickJob.new, :queue => AUTODRAFT_QUEUE, :run_at => 36.hours.from_now)
    end

    def self.clear
      Delayed::Job.where(queue: AUTODRAFT_QUEUE).destroy_all
    end
    
  end

  class Manager
    
    def self.autopick_time_utc
      autopick_job = Delayed::Job.where("handler LIKE ?", "%AutodraftPickJob%").first
      if !autopick_job.nil?
        autopick_job.run_at
      else
        nil
      end
    end

    def self.autopick_time
      self.autopick_time_utc.strftime("%A, %B %d, %Y at %I:%M %p")
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