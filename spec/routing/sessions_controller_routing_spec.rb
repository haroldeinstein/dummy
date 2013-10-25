require "spec_helper"

describe SessionsController do
  describe "routing" do
    it "should route to #new" do
      expect(get: "/admin/login").to route_to(controller: "sessions", action: "new")
    end

    it "should route to #destroy" do
      expect(get: "/admin/logout").to route_to(controller: "sessions", action: "destroy")
    end

    it "should route to #create" do
      expect(post: "/sessions").to route_to(controller: "sessions", action: "create")
    end
  end
end
