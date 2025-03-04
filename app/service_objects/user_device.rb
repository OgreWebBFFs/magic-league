class UserDevice
    attr_accessor :safari, :device_type
    alias_method :safari?, :safari

    def initialize user_agent
        detector = DeviceDetector.new user_agent
        @device_type = determine_device detector.device_type
        @safari = detector.name =~ /safari/i
    end

    private

    def determine_device device_type
        ['smartphone', 'tablet', 'feature phone'].include?(device_type) ? 'mobile' : 'desktop'
    end
end