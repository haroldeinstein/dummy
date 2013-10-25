require "spec_helper"

describe DirectorsController do
  describe "routing" do
    it "should route to #index" do
      expect(get: "/harold-einstein").to route_to(controller: "directors", action: "index", director: "harold-einstein")
    end

    it "should route to #create" do
      expect(post: "/api/admin/directors").to route_to(controller: "directors", action: "create")
    end
  end
end
