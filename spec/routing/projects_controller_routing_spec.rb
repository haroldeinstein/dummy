require "spec_helper"

describe ProjectsController do
  describe "routing" do
    it "should route to #show" do
      expect(get: "/api/admin/projects").to route_to(controller: "projects", action: "show")
    end

    it "should route to #update" do
      expect(put: "/api/admin/projects").to route_to(controller: "projects", action: "update")
    end
  end
end
