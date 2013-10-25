require "spec_helper"

describe ContactController do
  describe "routing" do
    it "should route to #index" do
      expect(get: "/hey").to route_to(controller: "contact", action: "index")
    end

    it "should route to #show" do
      expect(get: "/api/admin/reps").to route_to(controller: "contact", action: "show")
    end

    it "should route to #update" do
      expect(put: "/api/admin/reps").to route_to(controller: "contact", action: "update")
    end

    it "should route to #update_headline" do
      expect(put: "/api/admin/headline").to route_to(controller: "contact", action: "update_headline")
    end

    it "should route to #update_address" do
      expect(put: "/api/admin/address").to route_to(controller: "contact", action: "update_address")
    end

    it "should route to #update_person" do
      expect(put: "/api/admin/person").to route_to(controller: "contact", action: "update_person")
    end

  end
end
