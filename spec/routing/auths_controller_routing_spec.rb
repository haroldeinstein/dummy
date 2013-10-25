require "spec_helper"

describe AuthsController do
  describe "routing" do
    it "should route to #create" do
      expect(get: "/auth/vimeo").to route_to(controller: "auths", action: "create")
    end

    it "should route to #vimeo" do
      expect(get: "/auth/vimeo/callback").to route_to(controller: "auths", action: "vimeo")
    end
  end
end
