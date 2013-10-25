require "spec_helper"

describe UsersController do
  describe "routing" do
    it "should route to #new" do
      expect(get: "/admin/signup").to route_to(controller: "users", action: "new")
    end

    it "should route to #create" do
      expect(post: "/admin").to route_to(controller: "users", action: "create")
    end
  end
end
