require "spec_helper"

describe MemoirsController do
  describe "routing" do
    it "should route to #index" do
      expect(get: "/the-special-ones").to route_to(controller: "memoirs", action: "index")
    end
    it "should route to #create" do
      expect(post: "/admin/the-special-ones").to route_to(controller: "memoirs", action: "create")
    end

    it "should route to #update" do
      expect(put: "/admin/the-special-ones").to route_to(controller: "memoirs", action: "update")
    end

    it "should route to #update_description" do
      expect(put: "/api/admin/description").to route_to(controller: "memoirs", action: "update_description")
    end

    it "should route to #show" do
      expect(get: "/api/admin/memoirs").to route_to(controller: "memoirs", action: "show")
    end
  end
end
