require "spec_helper"

describe AdminController do
  describe "rounting" do
    it "routes to #index" do
      expect(get: "/admin").to route_to(controller: "admin", action: "index")
    end

    it "routes to #contact" do
      expect(get: "/admin/hey").to route_to(controller: "admin", action: "contact")
    end

    it "routes to #memoir" do
      expect(get: "/admin/the-special-ones").to route_to(controller: "admin", action: "memoir")
    end

    it "routes to #news" do
      expect(get: "/admin/news").to route_to(controller: "admin", action: "news")
    end

    it "routes to #director" do
      expect(get: "/admin/harold-einstein").to route_to(controller: "admin", action: "director", director: "harold-einstein")
    end
  end
end
